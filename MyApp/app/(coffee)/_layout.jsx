// Every directory need _layout.jsx ( or .tsx)

import { Slot } from 'expo-router'; 


//Minimum Code needed in a layout.jsx file
export default function CoffeeLayout() {
    return (
        <Slot />
    );
}