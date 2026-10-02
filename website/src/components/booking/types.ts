import type { BookingState } from '../../lib/booking';

export type FieldKey =
  | 'area' | 'areaOther' | 'service' | 'petType' | 'size' | 'puppy' | 'breed'
  | 'date' | 'window' | 'name' | 'phone' | 'consent' | 'note'
  | 'wlName' | 'wlPhone' | 'wlArea';

export type Errors = Partial<Record<FieldKey, string>>;

export interface StepProps {
  state: BookingState;
  set: (patch: Partial<BookingState>) => void;
  errors: Errors;
}

/** DOM id of the control that receives focus when a field is invalid (07 §9). */
export const FIELD_IDS: Record<FieldKey, string> = {
  area: 'pds-area',
  areaOther: 'pds-area-other',
  service: 'pds-service-full-groom',
  petType: 'pds-pet-dog',
  size: 'pds-size-small',
  puppy: 'pds-puppy',
  breed: 'pds-breed',
  date: 'pds-date-0',
  window: 'pds-window-0',
  name: 'pds-name',
  phone: 'pds-phone',
  consent: 'pds-consent',
  note: 'pds-note',
  wlName: 'wl-name',
  wlPhone: 'wl-phone',
  wlArea: 'wl-area',
};

export const errId = (k: FieldKey) => `${FIELD_IDS[k]}-error`;
