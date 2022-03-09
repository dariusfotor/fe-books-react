import React from 'react'
import styled from 'styled-components'
import Register from '../auth/register/register'

export const RegisterRoute: React.FC<{}> = () => {
    return (
        <Container>
            <Register />
        </Container>
    )
}

const Container = styled.div`

`