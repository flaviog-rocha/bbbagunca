import { tableInterface } from "@/utils/interfaces";
import { rowContent } from "@/utils/interfaces";

export default function Table({header, data, isLoading}: tableInterface){
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
                    {typeof headerData.name === 'string' ? headerData.name : ''} 
                </th>
            )
        }

        return header;
    }

    const tableRows = (contents: rowContent[][] | undefined) => {
        const rowsData = [];

        if (isLoading){
            rowsData.push(
                <tr key="loading-line-warning">
                    <td 
                        key="empty-table-warning" 
                        colSpan={header.length} 
                        className="p-3 bg-purpleThemePrimary h-6 text-center"
                    >
                        Carregando...
                    </td>
                </tr>
            )
        }

        else if (!contents || contents.length === 0){
            rowsData.push(
                <tr key="empty-line-warning">
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
        return header.map((headerInfo) => {
            const data = dataObj.find((d) => d.key === headerInfo.key);
            return (
                <td 
                    key={`row-${index}-${headerInfo.key}`} 
                    className={`p-3 h-6 ${data?.textAlign ? 'text-' + data.textAlign : ''}`}
                >
                    {data?.name || ''}
                </td>
            );
        });
    };

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