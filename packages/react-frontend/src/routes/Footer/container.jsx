import React from 'react'
import Footer from './index'

export default function FooterContainer() {
    return(
        <Footer>
            <Footer.Wrapper>
                <Footer.Row>
                <Footer.Column>
                    <Footer.Title>About Us</Footer.Title>
                    <Footer.Link href="#">Story</Footer.Link>
                    <Footer.Link href="#">Etc</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                    <Footer.Title>FAQs</Footer.Title>
                    <Footer.Link href="#">Click here</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                    <Footer.Title>Terms and Conditions</Footer.Title>
                    <Footer.Link href="#">Story</Footer.Link>
                    <Footer.Link href="#">Etc</Footer.Link>
                </Footer.Column>
                <Footer.Column>
                    <Footer.Title>Contact Us</Footer.Title>
                    <Footer.Link href="#">Facebook</Footer.Link>
                    <Footer.Link href="#">Instagram</Footer.Link>
                </Footer.Column>
                </Footer.Row>
            </Footer.Wrapper>
        </Footer>
    )
}
