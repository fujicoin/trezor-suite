import { ReactNode } from 'react';

import styled from 'styled-components';

import { H3, Paragraph } from '@trezor/components';

const Description = styled.div`
    margin: 0 20%;
    color: #757575;
`;

const Buttons = styled.div``;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    min-height: 70vh;
    margin-top: 10vh;
`;

const Body = styled.div``;

// common. each view should have title and optionally buttons
type ViewPropsBase = {
    title?: ReactNode;
    // todo: consider more detailed description of buttons (cta, alt...)
    buttons?: ReactNode;
};

// most of the components will be like this, description and image
type ViewPropsStrict = ViewPropsBase & {
    description: ReactNode;
    // todo: depends on how we will end up defining images, we could either pass component or only string identifier
    image: ReactNode;
};

// some of the components might be more complicated so we will need to pass custom body
type ViewPropsLoose = ViewPropsBase & {
    children: ReactNode;
};

export const View = (props: ViewPropsStrict | ViewPropsLoose) => (
    <Wrapper>
        <div>
            {'title' in props && <H3 align="center">{props.title}</H3>}
            {'description' in props && (
                <Description>
                    <Paragraph>{props.description}</Paragraph>
                </Description>
            )}
        </div>
        <Body>{'children' in props ? props.children : <> {props.image}</>}</Body>

        {props.buttons && <Buttons>{props.buttons}</Buttons>}
    </Wrapper>
);
