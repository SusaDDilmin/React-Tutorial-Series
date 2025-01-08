// Appearance - get the color scheme of the device
// Platform - get the platform of the device
// SafeAreaView - a component to render content within the safe area boundaries of a device
// ScrollView - a component to render a scrollable list of items
// FlatList - a component to render a scrollable list of items
import { 
    StyleSheet , Appearance , Platform , SafeAreaView , ScrollView , View , FlatList , Text , Image
 } from "react-native";

import { Colors } from '../constants/Colors'


// Those are the items that will be displayed on the menu
import { MENU_ITEMS } from '../constants/MenuItems'
// Those are the images that will be displayed on the menu
import MENU_IMAGES from '../constants/MenuImages'


import { setStatusBarHidden } from "expo-status-bar";

export default function MenuScreen(){ 
    const colorScheme = Appearance.getColorScheme();

    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    styles = createStyles(theme , colorScheme);

    const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView;

    const separatorComp = <View style={styles.separator}/>

    const headerComp = <Text>Top of List</Text>
    const footerComp = <Text>End of List</Text>


    return(
        <Container >
            {/* Try to undestand how to use FlatList by below Example */}
            <FlatList
                data={MENU_ITEMS}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={ styles.contentContainer }
                ItemSeparatorComponent={separatorComp}
                ListHeaderComponent={headerComp}
                // We can style ListHeaderComponent & ListFooterComponent also as we do for ItemSeparatorComponent by using separatorComp variable
                ListHeaderComponentStyle={styles.headerComp}
                ListFooterComponent={footerComp}
                ListFooterComponentStyle={styles.footerComp}

                //If there is no items can use this
                ListEmptyComponent={<Text>No items</Text>}

                renderItem={({item}) => (
                    <View style={styles.row}>
                        <View style={styles.menuTextRow}>
                            {/* Both Styles will be applied style={[styles.menuItemTitle ,styles.menuItemText]}*/}
                            <Text style={[styles.menuItemTitle ,styles.menuItemText]}>{item.title}</Text>
                            <Text style={styles.menuItemText}>{item.description}</Text>
                        </View>
                        <Image
                            source={MENU_IMAGES[item.id - 1]}
                            style={styles.menuImage}
                        />
                    </View>
                )}
            ></FlatList>
        </Container>
    );

}

// This function will create the styles for the MenuScreen
// Try to undestand how it is used 
function createStyles(theme , colorScheme){ 

    return StyleSheet.create({ 
        contentContainer:{
            paddingTop: 10,
            paddingBottom: 20,
            paddingHorizontal: 12,
            backgroundColor: theme.background,
        },
        separator: {
            height: 1,
            width: '50%',
            backgroundColor: colorScheme === 'dark' ? 'papayawhip' : 'black',
            maxWidth: 300,
            marginHorizontal: 'auto',
            marginBottom: 10,
        },
        footerComp: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            marginBottom: 120,
        },
        headerComp: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            marginBottom: 120,  
        },
        row: {
            flexDirection: 'row',
            width: '100%',
            maxWidth: 600,
            height: 100,
            marginBottom: 10,
            borderStyle: 'solid',
            borderColor: colorScheme === 'dark' ? 'papayawhip' : 'black',
            borderWidth: 1,
            borderRadius: 10,
            overflow: 'hidden',
            marginHorizontal: 'auto',
        },
        menuImage: {
            width: 100,
            height: 100,
            borderRadius: 10,
        },
        menuTextRow: {
            flex: 1,
            marginLeft: 10,
        },
        menuItemTitle: {
            fontWeight: 'bold',
            fontSize: 18,
        },
        menuItemText: {
            fontSize: 16,
        }
    });
}