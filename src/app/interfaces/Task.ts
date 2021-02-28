export interface Task {

// general fields

    id?: string;
    title: string;
    costumerSurName: string;
    costumerNumber?: number
    deadlineDay: any;
    deadlineTime: any;
    description: string;
    createdAt: any;
    createdBy: any;
    taskType: string;
    assignedTo: string;
    isCompleted: boolean;
    completedBy: string;
    callWhenReady?: string;

// repair fields 

    deviceType?: string;
    displayWorks?: string;
    touchscreenWorks?: string;
    cameraWorks?: string;
    chargingWorks?: string;
    fingerprintWorks?: string;
    speakersWork?: string;
    deviceStraight?: string;
    deviceCase?: string;
    deviceSimcard?: string;
    devicePincode?: number;
    placeScreenProtector?: string;

// data transfer fields
    stateOfDevice?: string;
    accessories?: string;
    whatData?: string,
}