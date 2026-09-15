export const TAX_SYSTEMS = [
  { id: 'Custom', name: 'Custom', label: 'Tax', idLabel: 'Tax ID' },
  { id: 'US', name: 'United States — Sales Tax', label: 'Sales Tax', idLabel: 'EIN' },
  { id: 'EU', name: 'European Union — VAT', label: 'VAT', idLabel: 'VAT No.' },
  { id: 'UK', name: 'United Kingdom — VAT', label: 'VAT', idLabel: 'VAT Reg No.' },
  { id: 'IN', name: 'India — GST', label: 'GST', idLabel: 'GSTIN' },
  { id: 'CA', name: 'Canada — GST/HST', label: 'GST/HST', idLabel: 'GST/HST No.' },
  { id: 'AU', name: 'Australia — GST', label: 'GST', idLabel: 'ABN' },
  { id: 'UAE', name: 'UAE — VAT', label: 'VAT', idLabel: 'TRN' },
];

export const US_STATES = [
  { name: 'Alabama', rate: 4.0 }, { name: 'Alaska', rate: 0.0 }, { name: 'Arizona', rate: 5.6 }, { name: 'Arkansas', rate: 6.5 },
  { name: 'California', rate: 7.25 }, { name: 'Colorado', rate: 2.9 }, { name: 'Connecticut', rate: 6.35 }, { name: 'Delaware', rate: 0.0 },
  { name: 'Florida', rate: 6.0 }, { name: 'Georgia', rate: 4.0 }, { name: 'Hawaii', rate: 4.0 }, { name: 'Idaho', rate: 6.0 },
  { name: 'Illinois', rate: 6.25 }, { name: 'Indiana', rate: 7.0 }, { name: 'Iowa', rate: 6.0 }, { name: 'Kansas', rate: 6.5 },
  { name: 'Kentucky', rate: 6.0 }, { name: 'Louisiana', rate: 4.45 }, { name: 'Maine', rate: 5.5 }, { name: 'Maryland', rate: 6.0 },
  { name: 'Massachusetts', rate: 6.25 }, { name: 'Michigan', rate: 6.0 }, { name: 'Minnesota', rate: 6.875 }, { name: 'Mississippi', rate: 7.0 },
  { name: 'Missouri', rate: 4.225 }, { name: 'Montana', rate: 0.0 }, { name: 'Nebraska', rate: 5.5 }, { name: 'Nevada', rate: 6.85 },
  { name: 'New Hampshire', rate: 0.0 }, { name: 'New Jersey', rate: 6.625 }, { name: 'New Mexico', rate: 5.125 }, { name: 'New York', rate: 4.0 },
  { name: 'North Carolina', rate: 4.75 }, { name: 'North Dakota', rate: 5.0 }, { name: 'Ohio', rate: 5.75 }, { name: 'Oklahoma', rate: 4.5 },
  { name: 'Oregon', rate: 0.0 }, { name: 'Pennsylvania', rate: 6.0 }, { name: 'Rhode Island', rate: 7.0 }, { name: 'South Carolina', rate: 6.0 },
  { name: 'South Dakota', rate: 4.5 }, { name: 'Tennessee', rate: 7.0 }, { name: 'Texas', rate: 6.25 }, { name: 'Utah', rate: 6.1 },
  { name: 'Vermont', rate: 6.0 }, { name: 'Virginia', rate: 5.3 }, { name: 'Washington', rate: 6.5 }, { name: 'West Virginia', rate: 6.0 },
  { name: 'Wisconsin', rate: 5.0 }, { name: 'Wyoming', rate: 4.0 }
];

export const EU_COUNTRIES = [
  { name: 'Austria', rate: 20 }, { name: 'Belgium', rate: 21 }, { name: 'Bulgaria', rate: 20 }, { name: 'Croatia', rate: 25 },
  { name: 'Cyprus', rate: 19 }, { name: 'Czechia', rate: 21 }, { name: 'Denmark', rate: 25 }, { name: 'Estonia', rate: 22 },
  { name: 'Finland', rate: 24 }, { name: 'France', rate: 20 }, { name: 'Germany', rate: 19 }, { name: 'Greece', rate: 24 },
  { name: 'Hungary', rate: 27 }, { name: 'Ireland', rate: 23 }, { name: 'Italy', rate: 22 }, { name: 'Latvia', rate: 21 },
  { name: 'Lithuania', rate: 21 }, { name: 'Luxembourg', rate: 17 }, { name: 'Malta', rate: 18 }, { name: 'Netherlands', rate: 21 },
  { name: 'Poland', rate: 23 }, { name: 'Portugal', rate: 23 }, { name: 'Romania', rate: 19 }, { name: 'Slovakia', rate: 20 },
  { name: 'Slovenia', rate: 22 }, { name: 'Spain', rate: 21 }, { name: 'Sweden', rate: 25 }
];

export const CA_PROVINCES = [
  { name: 'Alberta (GST)', rate: 5 }, { name: 'British Columbia (GST+PST)', rate: 12 }, { name: 'Manitoba (GST+RST)', rate: 12 },
  { name: 'New Brunswick (HST)', rate: 15 }, { name: 'Newfoundland and Labrador (HST)', rate: 15 }, { name: 'Northwest Territories (GST)', rate: 5 },
  { name: 'Nova Scotia (HST)', rate: 15 }, { name: 'Nunavut (GST)', rate: 5 }, { name: 'Ontario (HST)', rate: 13 },
  { name: 'Prince Edward Island (HST)', rate: 15 }, { name: 'Quebec (GST+QST)', rate: 14.975 }, { name: 'Saskatchewan (GST+PST)', rate: 11 },
  { name: 'Yukon (GST)', rate: 5 }
];

export const IN_RATES = [0, 5, 12, 18, 28];
