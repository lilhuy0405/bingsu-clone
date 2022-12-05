import 'antd/dist/antd.css'
import Header from "./components/Header";
import {Provider} from "react-redux";
import store from "./state";
import TokenSeller from "./components/TokenSeller";
import {Toaster} from "react-hot-toast";
import Instruction from "./components/Instruction";
import Tokenomic from "./components/Tokenomic";
import styled from "styled-components";
import TimeLine from "./components/TimeLine";
import Footer from "./components/Footer";
import Founder from "./components/Founder";
import SmartContractAudit from "./components/SmartContractAudit";
import HamburgerMenu from "./components/HamburgerMenu";
import useWindowSize from "./hooks/useWindowSize";
import WrongChainModal from "./components/WrongChainModal";
import {Suspense} from 'react';
import {Skeleton} from "antd";
import {QueryClient, QueryClientProvider} from "react-query";
import Airdrop from "./components/Airdrop";


const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  @media only screen and (max-width: 992px) {
    width: 100%;
    margin: 0 auto;
  }
`
const queryClient = new QueryClient()
function App() {
  const isMobile = useWindowSize(992);
  return (
    <Suspense fallback={<Skeleton/>}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Header/>
          <Wrapper>
            <TokenSeller/>
            <Airdrop/>
            <Instruction/>
            <Tokenomic/>
            <Toaster/>
            <TimeLine/>
            <Founder/>
            <SmartContractAudit/>
          </Wrapper>
          <Footer/>
          {isMobile && <HamburgerMenu/>}
          <WrongChainModal/>
        </Provider>
      </QueryClientProvider>
    </Suspense>
  )
}

export default App
