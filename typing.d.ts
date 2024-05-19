declare module 'react-native-maps' {
    export interface MapViewProps {
      style?: any;
      initialRegion?: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
      };
      zoomEnabled?: boolean;
      // 他のプロパティもここに追加できます
    }
  
    export default class MapView extends React.Component<MapViewProps> {}
  }