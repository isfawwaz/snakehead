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
    useDisclosure,
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
import { useEffect } from "react";

export default function Sidebar({ isOpen, onClose, onOpen }) {
    const [isMediaLarge] = useMediaQuery("(min-width: 992px)");
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
        <Drawer placement="left" size="xs" isOpen={ isOpen } onClose={ onClose } trapFocus={ !isMediaLarge }>
            <DrawerOverlay>
                <DrawerContent>
                    { !isMediaLarge ? <DrawerCloseButton /> : false }
                    <DrawerHeader>
                        <div className="sh-logo">
                            <Logo />
                        </div>
                    </DrawerHeader>
                    <DrawerBody>
                        <Stack direction="column" spacing={ 4 }>
                            <MenuLink isActive={ true } leftIcon={ <Icon name="home-5" type="line" size="xl"/> }>Semua Data</MenuLink>
                            <MenuLink leftIcon={ <IkanGurame /> }>Ikan Gurame</MenuLink>
                            <MenuLink leftIcon={ <IkanNila /> }>Ikan Nila</MenuLink>
                            <MenuLink leftIcon={ <IkanDori /> }>Ikan Dori</MenuLink>
                            <MenuLink leftIcon={ <IkanLele /> }>Ikan Lele</MenuLink>
                            <MenuLink leftIcon={ <Udang /> }>Udang</MenuLink>
                            <Divider/>
                            <Button variant="solid" colorScheme="brand" leftIcon={ <Icon name="add" type="line" /> }>Tambah Baru</Button> 
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    </>
}