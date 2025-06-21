//Fill in the customer data object with default values and types

export const customerData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  websiteUrl: 'https://www.alexanderochson.com',
  siteName: 'Alexander&son webservices',
  message: '',
  contactMessage: '',
  consent: false,
  contactIcon: '',
  contactImage: '',
  errors: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    consent: '',
  },
}
export type CustomerData = typeof customerData
export const initialCustomerData: CustomerData = {
  ...customerData,
}
