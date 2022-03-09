import React from 'react'

import styled from 'styled-components'
import HomePage from '../homePage'

export const HomePageRoute: React.FC<{}> = () => {
    return (
        <Container>
            <HomePage />
        </Container>
    )
}

const Container = styled.div`

`