import React, {Component} from "react";
import {RecyclerListView, DataProvider} from "recyclerlistview-gridlayoutmanager";
import FlightGridLayoutProvider from './FlightGridLayoutProvider';
import FlightGridLayoutProviderHorizontal from './FlightGridLayoutProviderHorizontal';
import {View, Dimensions, Text, Image} from "react-native";
import FlightCard from "./FlightCard";
import FlightData from "./FlightData";
import HotelCard from "./HotelCard";
import TopWidget from "./TopWidget";
let {height, width} = Dimensions.get('window');
export default class FlightsPage extends Component {
    constructor(args) {
        super(args);
        this.state = {
            dataProvider: new DataProvider((r1, r2) => {
                return r1 !== r2
            }).cloneWithRows(FlightData)
        };
        //#if [VERTICAL]
        this._layoutProvider = new FlightGridLayoutProvider(this.state.dataProvider);
        //#endif
        //#if [HORIZONTAL]
        // this._layoutProvider = new FlightGridLayoutProviderHorizontal(this.state.dataProvider);
        //#endif

        this._renderRow = this._renderRow.bind(this);
    }


    _renderRow(type, data) {
        switch (type) {
            case "HOTEL_ITEM":
                return <HotelCard/>
            case "FL_ITEM":
                return <FlightCard/>;
            case "HEADER":
                return <TopWidget/>;
            default:
                return null;

        }

    }

    render() {
        //#if [VERTICAL]
        let isHorizontal = false;
        //#endif
        //#if [HORIZONTAL]
        // let isHorizontal = true;
        //#endif
        return <View style={styles.container}>
            <RecyclerListView isHorizontal={isHorizontal} rowRenderer={this._renderRow} dataProvider={this.state.dataProvider}
                              layoutProvider={this._layoutProvider}/>
        </View>
    }
}
const styles = {
    container: {
        flex: 1,

    },
    header:{
        height: 65,
        backgroundColor:'orange',
        alignItems:"center",
        flexDirection:"row",
        elevation:4
    },
    headerText:{
        color:'white',
        fontSize:18,
        marginLeft: 16,
        paddingBottom:3
    },
    backIcon:{
        height:23,
        width:23,
        marginLeft:16

    }
}