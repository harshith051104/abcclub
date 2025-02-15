export interface Event {
  _id?: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  description?: string;
  imageUrl?: string;
  imagePublicId?: string;
  googleFormUrl?: string;
  duration?: string;
}

export interface EventFormData extends Event {
  imageFile?: File | null;
} 