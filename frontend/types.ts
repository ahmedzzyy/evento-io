// User Interfaces
export interface BaseUser {
    _id: string;
    username: string;
    email: string;
}

export interface User {
    username: string;
    email: string;
    role: 'attendee' | 'organizer';
}

export interface CommonUser extends User {
    _id: string;
    __v: number;
}

export interface RegisterUser {
    username: string;
    password: string;
    email: string;
    role: 'attendee' | 'organizer';
}

// Event Interfaces

export type Organizer = BaseUser;

export interface IEvent {
    _id: string;
    title: string;
    description: string;
    date: string; // or Date if you plan to parse it
    location: string;
    organizer: Organizer | string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface EventData {
    title: string;
    description: string;
    date: string;
    location: string;
}

export interface FilterParams {
    dateFrom?: string;
    dateTo?: string;
    location?: string;
    type?: string;
}

export interface PaginatedEventsResponse {
    events: IEvent[];
    currentPage: string;
    totalPages: number | null;
    totalEvents: number;
}

// Registration Interfaces

export type Attendee = BaseUser;

export interface IRegistration {
    _id: string;
    event: string;
    attendee: Attendee;
    status: 'registered' | 'absent' | 'present';
    registeredAt: string;
}
