import styled from "styled-components";
import {Col, Image, Row, Table} from "antd";
import {formatNumber} from "../utils";
import {useTranslation} from "react-i18next";

const Wrapper = styled.div`
  width: 100%;
  margin: 50px auto;
`

const StyledTable = styled(Table)`
  margin-top: 50px;
  background-color: transparent !important;

  .ant-table-thead th {
    background-color: #0090CD;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
  //@media (max-width: 768px) {
  //  table {
  //    width: 100%;
  //  }
  //}
  

  .transparent-table-row {
    background: #E6F1FF;
    font-size: 16px;
  }
  

  .transparent-table-row td {
    border-bottom: 1px solid #dcdcdc;
  }

`

const StyledRow = styled(Row)`
  display: flex;
  align-items: center;
`


const Tokenomic = () => {
  const {t} = useTranslation();

  const columns = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      render: (names: []) => {
        return names.map((name: string) => <div key={name} style={{fontWeight: 'bold'}}>{name}</div>)
      }
    },

    {
      title: `${t('Allocation')} %`,
      dataIndex: 'allocationPercent',
      key: 'allocationPercent',
      render: (number: number) => {
        return formatNumber(number.toFixed(2), '%')
      }
    },
    {
      title: `${t('Allocation')} $BSC`,
      dataIndex: 'allocationToken',
      key: 'allocationToken',
      render: (number: number) => {
        return formatNumber(number.toFixed(2), '$BSC')
      }
    }
  ]

  const data = [
    {
      key: '1',
      name: [`${t('Private Sale')}`, 'IDO', `${t('Presale')}`],
      allocationPercent: 20,
      allocationToken: 200_000_000_000_000
    },
    {
      key: '2',
      name: [t('Public Sale')],
      allocationPercent: 20,
      allocationToken: 200_000_000_000_000
    },
    {
      key: '3',
      name: [t('Foundation')],
      allocationPercent: 45,
      allocationToken: 450_000_000_000_000
    },
    {
      key: '4',
      name: [t('Airdrop')],
      allocationPercent: 5,
      allocationToken: 50_000_000_000_000
    },
    {
      key: '5',
      name: [t('Founding Members')],
      allocationPercent: 10,
      allocationToken: 100_000_000_000_000
    },
    {
      key: '6',
      name: [t('Total')],
      allocationPercent: 100,
      allocationToken: 1_000_000_000_000_000
    }
  ]
  return (
    <Wrapper>
      <StyledRow gutter={24}>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Image src="/images/tokenomic.png" width="100%" preview={false}/>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <StyledTable
            columns={columns}
            dataSource={data}
            pagination={false}
            rowClassName={"transparent-table-row"}
          />

        </Col>
      </StyledRow>
    </Wrapper>
  )
}

export default Tokenomic