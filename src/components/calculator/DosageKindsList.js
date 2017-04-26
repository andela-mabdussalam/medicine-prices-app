import React from 'react';
import { Table } from 'react-bootstrap';

/*
* The list of dosages/variations of a drug a user
* chooses from after submitting the drug they purchase
*/
export function DosageKindsList(props) {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>Dosage Form</th>
          <th>Strength</th>
        </tr>
      </thead>
      <tbody>
        {props.dosageKinds.map(
          (drug, index) => {
            return (
              <tr key={index} onClick={() => props.dosageKindClicked(drug)}>
                <td>{drug.name}</td>
                <td>{drug.form}</td>
                <td>{drug.strength}</td>
              </tr>
            );
          }
        )}
      </tbody>
    </Table>
  )
}
