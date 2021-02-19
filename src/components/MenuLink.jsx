import { Box, Stack } from "@chakra-ui/react";
import { Fragment } from "react";
import ConditionalWrapper from "./ConditialWrapper";

export default function MenuLink({ children, isActive, leftIcon, ...props }) {
    const LeftIcon = leftIcon !== undefined ? leftIcon : "";
    return <Box as="button"
    className="sh-menu-link"
    height="2.5rem"
    lineHeight="1.2"
    transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
    borderRadius=".375rem"
    fontFamily="heading"
    fontSize=".875rem"
    fontWeight={ isActive ? "bold" : "500" }
    textAlign="left"
    color={ isActive ? "#1c917f" : "#6e7191" }
    bg="transparent"
    _hover={{
        color: "#1c917f"
    }}
    _active={{
        bg: "#baf3ec",
        color: "#1c917f"
    }}
    {...props}>
        <Stack direction="row" spacing={ 4 } align="center">
            <ConditionalWrapper condition={ leftIcon !== undefined } wrapper={ children => <div className="sh-icon">{children}</div>}>
                <Fragment>
                    {LeftIcon}
                </Fragment>
            </ConditionalWrapper>
            <span>{children}</span>
        </Stack>
    </Box>;
}