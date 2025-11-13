import MainStack from './MainStack';
import { useNavigation} from '@react-navigation/native';


export default function DrawerNavigator() {
    const navigation = useNavigation();
    return (
        <MainStack/>
    );
}