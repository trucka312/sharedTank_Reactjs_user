import styled from "styled-components"
import { Layout } from "antd"

const { Content } = Layout

export const StyledContent = styled(Content)`
  background: #FBF4F5;
  margin-top: 120px;
  box-sizing: border-box;
  min-height: calc(100vh - 94px)!important;
  @media (max-width: 576px) {
    margin-top: 58px;
  }
`