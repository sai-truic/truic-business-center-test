import React, { useEffect, useCallback } from 'react';
import { useAtom } from 'jotai';
import { useSafeUser } from './useSafeUser';
import { useDataStore } from '../hooks/useDataStore';
import {
  sidebarOptionAtom,
  userIdAtom,
  organizationIdAtom,
  inputStateAtom,
  textAreaStateAtom,
  accordionStateAtom,
  alertStateAtom,
  alertDialogStateAtom,
  aspectRatioStateAtom,
  avatarStateAtom,
  badgeStateAtom,
  breadcrumbStateAtom,
  buttonStateAtom,
  calendarStateAtom,
  cardStateAtom,
  carouselStateAtom,
  chartStateAtom,
  selectStateAtom,
  comboboxStateAtom,
  formStateAtom,
  onboardingDataAtom,
  effectiveDateAtom,
  companyNameDataAtom,
  shouldGenerateAtom,
  businessPlanGeneratorDataAtom,
  qrMenuSelectedAtom,
  qrCodeAtom,
  vCardStateAtom,
  meCardStateAtom,
  textualQRStateAtom,
  phoneNumberStateAtom,
  emailStateAtom,
  smsStateAtom,
  geoLocationStateAtom,
  socialMediaStateAtom,
  digitalWalletsStateAtom,
  wifiStateAtom
} from '../atoms/inputStateAtoms';

// All atoms now imported from ../atoms/inputStateAtoms


const useInputState = () => {
  // Mock router for compatibility - we don't actually use router in this hook
  const router = { isReady: true, query: {} };
  
  const { user } = useSafeUser();
  const [userId, setUserId] = useAtom(userIdAtom);
  const [organizationId, setOrganizationId] = useAtom(organizationIdAtom);
  const [onboardingData, setOnboardingData] = useAtom(onboardingDataAtom);
  const [effectiveDate, setEffectiveDate] = useAtom(effectiveDateAtom);
  const [companyNameData, setCompanyNameData] = useAtom(companyNameDataAtom);
  const [businessPlanGeneratorData, setBusinessPlanGeneratorDataOriginal] = useAtom(businessPlanGeneratorDataAtom);
  const [sidebarOption, setSidebarOption] = useAtom(sidebarOptionAtom);
  const [qrCode, setQRCode] = useAtom(qrCodeAtom);
  const [qrMenuSelected, setQrMenuSelected] = useAtom(qrMenuSelectedAtom);
  const [shouldGenerate, setShouldGenerate] = useAtom(shouldGenerateAtom);
  const [vCardState, setVCardState] = useAtom(vCardStateAtom);
  const [meCardState, setMeCardState] = useAtom(meCardStateAtom);

  const updateVCardState = (field, value) => {
    setVCardState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const updateMeCardState = (field, value) => {
    setMeCardState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const cosmosDB = useDataStore('cosmosdb');

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        if (businessPlanGeneratorData.__updated === "False") {
          try {
            const userData = await cosmosDB.fetch('BusinessPlanTool', `c.userId = "${user.id}"`);
            if (userData && userData.length > 0) {
              setBusinessPlanGeneratorDataOriginal(userData[0]);
            } else {
              setBusinessPlanGeneratorDataOriginal(prevData => ({
                ...prevData,
                userId: user.id
              }));
            }
            setBusinessPlanGeneratorDataOriginal(prevData => ({
              ...prevData,
              __updated: "True"
            }));
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      }
    };

    if (sidebarOption === "BusinessPlanGenerator") {
      fetchUserData();
    }
  }, [user, businessPlanGeneratorData.__updated, sidebarOption, cosmosDB]);

  const setBusinessPlanGeneratorData = useCallback((newData) => {
    setBusinessPlanGeneratorDataOriginal((prevData) => {
      const updatedData = typeof newData === 'function' ? newData(prevData) : { ...prevData, ...newData };
      

      if (updatedData.__submit === "True") {
        const tempData = { ...updatedData, __submit: "False" };
        const dataToSubmit = { ...tempData, __updated: "False" };
        cosmosDB.save('BusinessPlanTool', dataToSubmit)
          .then(() => {
            setBusinessPlanGeneratorDataOriginal(prev => ({                                                                                 
              ...prev,                                                                                                                      
              __submit: "False"                                                                                                             
            })); 
          })
          .catch((error) => console.error('Error submitting data:', error));
      }

      return updatedData;
    });
  }, [setBusinessPlanGeneratorDataOriginal, cosmosDB]);

  const states = {
    input: useAtom(inputStateAtom),
    textArea: useAtom(textAreaStateAtom),
    accordion: useAtom(accordionStateAtom),
    alert: useAtom(alertStateAtom),
    alertDialog: useAtom(alertDialogStateAtom),
    aspectRatio: useAtom(aspectRatioStateAtom),
    avatar: useAtom(avatarStateAtom),
    badge: useAtom(badgeStateAtom),
    breadcrumb: useAtom(breadcrumbStateAtom),
    button: useAtom(buttonStateAtom),
    calendar: useAtom(calendarStateAtom),
    card: useAtom(cardStateAtom),
    carousel: useAtom(carouselStateAtom),
    chart: useAtom(chartStateAtom),
    select: useAtom(selectStateAtom),
    combobox: useAtom(comboboxStateAtom),
    form: useAtom(formStateAtom)
  };

  const components = {
    onboarding: [onboardingData, setOnboardingData],
  };

    const updateState = React.useCallback((stateType, id, data) => {
      if (states[stateType]) {
        const [, setState] = states[stateType];
        setState(prevState => {
          const currentData = prevState[id] || {};
          const newData = typeof data === 'function' ? data(currentData) : { ...currentData, ...data };
          
          // Simple shallow comparison of values
          const hasChanged = Object.keys(newData).some(key => currentData[key] !== newData[key]);
          if (!hasChanged) {
            return prevState; // No change, return the previous state
          }
          
          return {
            ...prevState,
            [id]: newData
          };
        });
      } else if (components[stateType]) {
        const [, setComponentState] = components[stateType];
        setComponentState(prevState => {
          const newData = typeof data === 'function' ? data(prevState) : { ...prevState, ...data };
          
          if (JSON.stringify(prevState) === JSON.stringify(newData)) {
            return prevState; // No change, return the previous state
          }
          
          return newData;
        });
      } else {
        console.warn(`State type "${stateType}" not found`);
      }
    }, [states, components]);
  
    const getState = React.useCallback((stateType, id) => {
      if (states[stateType]) {
        const [state] = states[stateType];
        return state[id] || {};
      } else if (components[stateType]) {
        const [componentState] = components[stateType];
        return componentState;
      } else {
        console.warn(`State type "${stateType}" not found`);
        return {};
      }
    }, [states, components]);

    const resetState = () => {
      setQRCode({});
      setShouldGenerate(false);
    }

    return {
      router: router?.isReady ? router : null,
      userId, setUserId,
      organizationId, setOrganizationId,
      effectiveDate, setEffectiveDate,
      companyNameData, setCompanyNameData,
      ...Object.fromEntries(Object.entries(states).map(([key, [state]]) => [key + 'State', state])),
      ...Object.fromEntries(Object.entries(components).map(([key, [state]]) => [key + 'State', state])),
      updateState,
      getState,
      businessPlanGeneratorData, 
      setBusinessPlanGeneratorData,
      sidebarOption, setSidebarOption,
      qrMenuSelected,
      setQrMenuSelected,
      qrCode,
      setQRCode,
      shouldGenerate,
      setShouldGenerate,
      resetState,
    };
};

export default useInputState;

// Export atoms for other components that might import them
export {
  vCardStateAtom,
  meCardStateAtom,
  textualQRStateAtom,
  phoneNumberStateAtom,
  phoneNumberStateAtom as PhoneNumberStateAtom, // Legacy name support
  emailStateAtom,
  smsStateAtom,
  geoLocationStateAtom,
  socialMediaStateAtom,
  digitalWalletsStateAtom,
  wifiStateAtom
} from '../atoms/inputStateAtoms';
