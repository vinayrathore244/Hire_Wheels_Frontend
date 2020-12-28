interface VehiclePropertyList {
    PropertyValue: Map<number, string>;
}

export interface VehicleProperty {
    name: string;
    value: string;
}

export const SubCategory: VehiclePropertyList = {
    PropertyValue: new Map([
        [1, 'SUV'],
        [2, 'SEDAN'],
        [3, 'HATCHBACK'],
        [4, 'CRUISER'],
        [5, 'DIRT BIKE'],
        [6, 'SPORTS BIKE']
    ])
};

export const CarSubCategory: VehicleProperty[] = [
    {
        name: 'SUV',
        value: '1'
    },
    {
        name: 'SEDAN',
        value: '2'
    },
    {
        name: 'HATCHBACK',
        value: '3'
    }
];

export const BikeSubCategory: VehicleProperty[] = [
    {
        name: 'CRUISER',
        value: '4'
    },
    {
        name: 'DIRT BIKE',
        value: '5'
    },
    {
        name: 'SPORTS BIKE',
        value: '6'
    }
];

export const AvailableLocation: VehicleProperty[] = [
    {
        name: 'Worli',
        value: '1'
    },
    {
        name: 'Chembur',
        value: '2'
    },
    {
        name: 'Powai',
        value: '3'
    }
];
