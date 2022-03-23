import React from 'react'

type TableProps = {
    data: {
        title: string
    }
}

const Table = (props: TableProps) => {
    return (
        <table>
            <thead>{props.data.title}</thead>
        </table>
    )
}

export default Table