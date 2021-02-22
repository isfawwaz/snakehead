import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button
} from "@chakra-ui/react";
import { useRef } from "react";

const AlertConfirmation = ({ id, name, isOpen, onClose, onDelete }) => {
    const cancelRef = useRef();

    const handleDelete = () => {
        if( onDelete ) onDelete(id);
        onClose();
    }

    return <AlertDialog
    isOpen={ isOpen }
    leastDestructiveRef={cancelRef}
    onClose={onClose}>
        <AlertDialogOverlay>
            <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Hapus Data Ikan
                </AlertDialogHeader>
                <AlertDialogBody>
                    Apakah kamu yakin ingin menghapus data <strong>{name} #{id}</strong>?<br/>
                    Aksi ini tidak dapat dikembalikan jika telah dijalankan.
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="red" onClick={ handleDelete } ml={3}>
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
}

export default AlertConfirmation;