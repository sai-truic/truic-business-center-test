import { useState, useCallback, useMemo, useEffect } from 'react';
import { useWatch, Control } from 'react-hook-form';
import { useSafeUser } from '../useSafeUser';
import { useQuery } from '@tanstack/react-query';
import useInputState from '../useInputState';

interface OperatingAgreementData {
  id: string;
  userId: string;
  // Add other properties as needed
}

const useOperatingAgreement = (setValue: any, cosmosStore: any, control: Control) => {
  const [currentMemberType, setCurrentMemberType] = useState<string>('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoaded }: any = useSafeUser();
  const { effectiveDate, companyNameData } = useInputState();

  const currentMemberTypeWatch = useWatch({
    control,
    name: 'memberType',
    defaultValue: ''
  });
  const singleMemberAgreeTerms = useWatch({
    control,
    name: 'singleMemberAgreeTerms',
    defaultValue: false
  });
  const multiMemberAgreeTerms = useWatch({
    control,
    name: 'multiMemberAgreeTerms',
    defaultValue: false
  });
  
  const isAgreedToTerms = useMemo(() => {
    return currentMemberTypeWatch === 'single-member' ? !!singleMemberAgreeTerms : !!multiMemberAgreeTerms;
  }, [currentMemberTypeWatch, singleMemberAgreeTerms, multiMemberAgreeTerms]);

  const { data: fetchedAgreementData, isLoading: isFetchLoading, error: fetchError } = useQuery({
    queryKey: ['OperatingAgreementTool', user?.id],
    queryFn: async () => {
      const result = await cosmosStore.fetch('OperatingAgreementTool', `SELECT TOP 1 * FROM c WHERE c.userId = "${user?.id}" ORDER BY c._ts DESC`);
      return result.length > 0 ? result[0] : null;
    },
    enabled: isLoaded && !!user,
  });

  useEffect(() => {
    setIsLoading(isFetchLoading);
    if (fetchError) {
      setError('Failed to load agreement data. Please try again.');
    }
  }, [isFetchLoading, fetchError]);

  useEffect(() => {
    if (fetchedAgreementData) {
      Object.entries(fetchedAgreementData).forEach(([key, value]) => {
        setValue(key, value);
      });
      setCurrentMemberType(fetchedAgreementData.memberType);
    }
  }, [fetchedAgreementData, setValue]);

  const handleFormSubmit = async (data: any, event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    
    // Proceed with form submission (either via event or direct call)
    const isFormSubmission = !event || event.type === 'submit';
    if (isFormSubmission) {
      setIsLoading(true);
      setError(null);
      console.log("Company Name :", companyNameData)
      try {
        const formDataWithDates = {
          ...data,
          companyName: companyNameData,
          effectiveDate: data.effectiveDate === effectiveDate ? data.effectiveDate : effectiveDate,
          formationState: data.formationState,
          userId: user?.id, // Add userId to the form data
        };

        console.log("Form Data with Dates :", formDataWithDates);

        if (!formDataWithDates.companyName || formDataWithDates.companyName.trim().length <= 1) {
          throw new Error("Company name is required and must be at least 2 characters long.");
        }
        if (!formDataWithDates.effectiveDate) {
          throw new Error("Effective date is required.");
        }
        if (!formDataWithDates.formationState) {
          throw new Error("Formation state is required.");
        }

        // Generate PDF
        const pdfPromise = fetch('/api/generate-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataWithDates),
        }).then(async (response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
        });

        // Save new data to Cosmos DB (upsert will handle existing data)
        const cosmosPromise = cosmosStore.save('OperatingAgreementTool', formDataWithDates)
          .catch((error: unknown) => {
            console.error('Error saving to Cosmos DB:', error);
            throw error; // Throw the error to be caught in the outer catch block
          });

        // Wait for both operations to complete
        await Promise.all([pdfPromise, cosmosPromise]);
      } catch (error) {
        console.error('Error:', error);
        setError(error instanceof Error ? error.message : 'An error occurred while processing your request. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // If it's not a form submission (e.g., accordion click), clear any existing error
      setError(null);
    }
  };

  return {
    currentMemberType,
    setCurrentMemberType,
    pdfUrl,
    isLoading,
    error,
    isAgreedToTerms,
    handleFormSubmit,
    fetchedAgreementData
  };
};

export default useOperatingAgreement;
