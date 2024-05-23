import React from 'react';
import {Container, Wrapper, Row, Column, Link, Title} from './Styles/Footer'

export default function Footer(){
    return(
        <Container {...restProps}>{children}</Container>
    );
}

Footer.Wrapper = function FooterWrapper({children, ...restProps}) {
    return <Wrapper {...restProps}>{children}</Wrapper>
}

Footer.Wrapper = function FooterWrapper({children, ...restProps}) {
    return <Row {...restProps}>{children}</Row>
}

Footer.Wrapper = function FooterWrapper({children, ...restProps}) {
    return <Column {...restProps}>{children}</Column>
}

Footer.Wrapper = function FooterWrapper({children, ...restProps}) {
    return <Link {...restProps}>{children}</Link>
}

Footer.Wrapper = function FooterWrapper({children, ...restProps}) {
    return <Title {...restProps}>{children}</Title>
}