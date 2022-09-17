import React, {useEffect, useState} from 'react';
import { Container, Table } from "react-bootstrap";
import NavbarAdmin from '../components/navbar/NavbarAdmin';
import { API } from '../config/api';
import ListUser from '../modals/ListUser';


export default function IncomeTransaction() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const transactions = async () => {
      try {
        const response = await API.get("/transactions");
        setTransactions(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    transactions();
  }, [setTransactions]);


  return (
    <div>
    <NavbarAdmin />
    <div>
      <Container className='mt-5'>
        <div>
          <h1 className='mb-5' style={{ color: "#613D2B" }}>
            Income Transaction
          </h1>
          <ListUser />
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((item,index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.user.name}</td>
                  <td>{item.status}</td>
                </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  </div>
  )
}
