import React from 'react'

import styled from 'styled-components'
import BooksPage from '../books'

export const BooksPageRoute: React.FC<{}> = () => {
    return (
        <Container>
            <BooksPage />
        </Container>
    )
}

const Container = styled.div`
    width: 75%;
    margin: auto;
    padding: 40px;
`