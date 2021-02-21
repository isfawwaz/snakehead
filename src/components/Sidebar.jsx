import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerContent,
    DrawerCloseButton,
    DrawerOverlay,
    Stack,
    Divider,
    Button,
    useMediaQuery
  } from "@chakra-ui/react"
import MenuLink from './MenuLink';
import Icon from './Icon';
import { ReactComponent as Logo } from './../assets/logo.svg';
import { ReactComponent as IkanDori } from './../assets/menu/img-dori.svg';
import { ReactComponent as IkanGurame } from './../assets/menu/img-gurame.svg';
import { ReactComponent as IkanLele } from './../assets/menu/img-lele.svg';
import { ReactComponent as IkanNila } from './../assets/menu/img-nila.svg';
import { ReactComponent as Udang } from './../assets/menu/img-udang.svg';
import { useContext, useEffect } from "react";
import ConditionalWrapper from "./ConditialWrapper";
import { Link } from "react-router-dom";
import { checkMenu } from "../utils/ext";
import { ACTIONS, snakeHead, useFishes } from "../stores/hooks";

export default function Sidebar({ isOpen, onClose, onOpen, onAddClicked }) {
    const [isMediaLarge] = useMediaQuery("(min-width: 992px)");
    const { filter } = useFishes();
    const { isAll, isGurame, isNila, isDori, isLele, isUdang } = checkMenu( filter );

    const globalState = useContext(snakeHead);
    const { state, dispatch } = globalState;
    const onMenuClicked = (fish) => {
        dispatch({
            type: ACTIONS.FISH_FILTER,
            search: fish,
        });
    }
    useEffect(() => {
        if( isMediaLarge ) {
            onOpen();
        } else {
            onClose();
        }
        return () => {
            // cleanup
        }
    }, [isMediaLarge])
    return <>
        <Drawer id="sidebar" placement="left" size="xs" isOpen={ isOpen } onClose={ onClose } trapFocus={ !isMediaLarge } blockScrollOnMount={ !isMediaLarge } closeOnOverlayClick={ false } closeOnEsc={ false }>
            <ConditionalWrapper condition={ !isMediaLarge } wrapper={ children => <DrawerOverlay>{children}</DrawerOverlay>}>
                <DrawerContent>
                    { !isMediaLarge ? <DrawerCloseButton /> : false }
                    <DrawerHeader>
                        <div className="sh-logo">
                            <Logo />
                        </div>
                    </DrawerHeader>
                    <DrawerBody>
                        <Stack direction="column" spacing={ 4 }>
                            <MenuLink isActive={ isAll } leftIcon={ <Icon name="home-5" type="line" size="xl"/> } onClick={ () => onMenuClicked(undefined) }>Semua Data</MenuLink>
                            <MenuLink isActive={ isGurame } leftIcon={ <IkanGurame /> } onClick={ () => onMenuClicked("Gurame") }>Ikan Gurame</MenuLink>
                            <MenuLink isActive={ isNila } leftIcon={ <IkanNila /> } onClick={ () => onMenuClicked("Nila") }>Ikan Nila</MenuLink>
                            <MenuLink isActive={ isDori } leftIcon={ <IkanDori /> } onClick={ () => onMenuClicked("Dori") }>Ikan Dori</MenuLink>
                            <MenuLink isActive={ isLele } leftIcon={ <IkanLele /> } onClick={ () => onMenuClicked("Lele") }>Ikan Lele</MenuLink>
                            <MenuLink isActive={ isUdang } leftIcon={ <Udang /> } onClick={ () => onMenuClicked("Udang Vannamei") }>Udang</MenuLink>
                            <Divider/>
                            <Button onClick={ onAddClicked } variant="solid" colorScheme="brand" leftIcon={ <Icon name="add" type="line" /> }>Tambah Baru</Button> 
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </ConditionalWrapper>
        </Drawer>
    </>
}