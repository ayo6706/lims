"use client";
import { Grid } from 'gridjs-react';
import "gridjs/dist/theme/mermaid.css";

export default function Page() {
    return (
        <>
        <h1>Hello world</h1>
        <Grid
      data={[
        ['John', 'john@example.com'],
        ['Mike', 'mike@gmail.com']
      ]}
      columns={['Name', 'Email']}
      search={true}
      pagination={{
        limit: 1,
      }}
    />
        </>
        )
  }