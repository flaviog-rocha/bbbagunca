interface tableInterface {
    header: rowContent[],
    data?: rowContent[][],
}

interface rowContent {
    key: string,
    name: string,
    size?: number,
}

export default function Table({header, data}: tableInterface){
    const tableHeader = (headerObj: rowContent[]) => {
        const header = [];

        for (const headerData of headerObj){
            header.push(
                <th 
                    key={`header-${headerData.key}`}
                    className="p-3 h-6 text-zinc-200 bg-mainThemePrimary"
                    style={
                        {
                            width: headerData.size ? headerData.size : "",
                        }
                    }
                >
                    {headerData.name} 
                </th>
            )
        }

        return header;
    }

    const tableRows = (contents: rowContent[][] | undefined) => {
        const rowsData = [];

        if (!contents || contents.length === 0){
            rowsData.push(
                <tr>
                    <td 
                        key="empty-table-warning" 
                        colSpan={header.length} 
                        className="p-3 bg-purpleThemePrimary h-6 text-center"
                    >
                        Nenhuma informação adicionada.
                    </td>
                </tr>
            )
        }

        else {
            for (const contentIndex in contents){
                rowsData.push(
                    <tr 
                        className={`group hover:bg-mainThemeFullLighter transition duration-200 ${parseInt(contentIndex) % 2 === 0 ? "bg-purpleThemeLighterTable" : ""}`} 
                        key={`row-${contentIndex}`}
                    >
                        {tableRow(contents[contentIndex], contentIndex)}
                    </tr>
                )
            }
        }

        return rowsData;
    }

    const tableRow = (dataObj: rowContent[], index: string) => {
        const row = []

        for (const headerInfo of header){
            for (const data of dataObj){
                if (headerInfo.key === data.key){
                    row.push(
                        <td 
                            key={`row-${index}-${data.key}`} 
                            className={`p-3 h-6`}
                        >
                            {data.name}
                        </td>
                    )
                    break;
                }
            }
        }

        return row;
    }

    return (
        <table className="border border-collapse border-mainThemePrimary">
            <thead>
                <tr>
                    {tableHeader(header)}
                </tr>
            </thead>
            <tbody>
                {tableRows(data)}
            </tbody>
        </table>
    )
}