import React from 'react';
import {Container, Wrapper, Row, Column, Link, Title} from './Styles/Footer'

export default function Footer(){
    return(
        <Container>{children}</Container>
    );
}

Footer.Wrapper = function FooterWrapper({children}) {
    return <Wrapper>{children}</Wrapper>
}

Footer.Wrapper = function FooterWrapper({children}) {
    return <Row >{children}</Row>
}

Footer.Wrapper = function FooterWrapper({children}) {
    return <Column>{children}</Column>
}

Footer.Wrapper = function FooterWrapper({children}) {
    return <Link >{children}</Link>
}

Footer.Wrapper = function FooterWrapper({children}) {
    return <Title>{children}</Title>
}