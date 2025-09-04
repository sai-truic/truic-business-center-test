import { atom } from 'jotai';
import businessPlanGeneratorDefault from '../messages/business_plan_generator.json';

function replaceDatePlaceholders(obj: any): any {
  const today = new Date().toISOString().split('T')[0];
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      obj[key] = replaceDatePlaceholders(obj[key]);
    } else if (obj[key] === '_DATE_') {
      obj[key] = today;
    }
  }
  return obj;
}

// Core state atoms
export const sidebarOptionAtom = atom('Dashboard');
export const userIdAtom = atom('');
export const organizationIdAtom = atom('');
export const inputStateAtom = atom({ input: {} });
export const textAreaStateAtom = atom({ input: {} });
export const accordionStateAtom = atom({});
export const alertStateAtom = atom({});
export const alertDialogStateAtom = atom({});
export const aspectRatioStateAtom = atom({});
export const avatarStateAtom = atom({});
export const badgeStateAtom = atom({});
export const breadcrumbStateAtom = atom({});
export const buttonStateAtom = atom({});
export const calendarStateAtom = atom({});
export const cardStateAtom = atom({});
export const carouselStateAtom = atom({});
export const chartStateAtom = atom({});
export const selectStateAtom = atom({});
export const comboboxStateAtom = atom({});
export const formStateAtom = atom({});
export const onboardingDataAtom = atom({});
export const effectiveDateAtom = atom(new Date().toISOString().split('T')[0]);
export const companyNameDataAtom = atom('');
export const shouldGenerateAtom = atom(false);

const businessPlanGeneratorDataWithDates = replaceDatePlaceholders(JSON.parse(JSON.stringify(businessPlanGeneratorDefault)));
export const businessPlanGeneratorDataAtom = atom(businessPlanGeneratorDataWithDates);

export const qrMenuSelectedAtom = atom('Plain Text');
export const qrCodeAtom = atom({});
export const vCardStateAtom = atom({});
export const meCardStateAtom = atom({});
export const textualQRStateAtom = atom({
  URL: '',
  PlainText: '',
  AppleNotes: '',
});
export const phoneNumberStateAtom = atom({});
export const emailStateAtom = atom({});
export const smsStateAtom = atom({});
export const geoLocationStateAtom = atom({});
export const socialMediaStateAtom = atom({});
export const digitalWalletsStateAtom = atom({});
export const wifiStateAtom = atom({});