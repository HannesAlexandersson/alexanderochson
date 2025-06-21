export interface ContactFormData {
  formTitle: string
  subTitle: string
  from: string
  email: string
  message: string
  feedback: string
  receiverName: string
  receiverEmail: string
}

export interface FormDataProps {
  formData: ContactFormData
  classNames?: string
}

export interface ContactFormProviderProps {
  classNames?: string
}

export interface ContactFormValues {
  from: string
  email: string
  message: string
}
