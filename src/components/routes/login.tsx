import React from 'react'
import Login from '../auth/login/login'
import styled from 'styled-components'

export const LoginRoute: React.FC<{}> = () => {
    return (
        <Container>
            <Login />
        </Container>
    )
}

const Container = styled.div`

`