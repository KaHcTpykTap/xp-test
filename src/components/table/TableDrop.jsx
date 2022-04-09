import React from 'react'
import { useTable } from 'react-table'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import { TableContainer } from './styles/TableStyles'
import { useSelector } from 'react-redux'

const Table = ({ columns, data }) => {
  const [records, setRecords] = React.useState(data);
  const getRowId = React.useCallback(row => row.id, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ data: records, columns, getRowId })

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = records[dragIndex]
    setRecords(
      update(records, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRecord],
        ],
      })
    )
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                <th></th>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(
              (row, index) =>
                prepareRow(row) || (
                  <Row
                    index={index}
                    row={row}
                    moveRow={moveRow}
                    {...row.getRowProps()}
                  />
                )
            )}
          </tbody>
        </table>
      </DndProvider>
    </>
  )
}

const DND_ITEM_TYPE = 'row'

const Row = ({ row, index, moveRow }) => {
  const dropRef = React.useRef(null)
  const dragRef = React.useRef(null)

  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover(item, monitor) {
      if (!dropRef.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: DND_ITEM_TYPE, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  preview(drop(dropRef))
  drag(dragRef)

  return (

    <tr ref={dropRef} style={{ opacity }}>
      <td ref={dragRef} className='td-move'>
        <div className='div-icons'>
          <span className='material-icons' style={{ cursor: 'pointer' }}>
            height
          </span>
        </div>
      </td>
      {row.cells.map((cell, index) => (
        index === 0
          ? <td key={index} {...cell.getCellProps()} className='td-row-icons0' >
            <div className='div-icons'>
              <div className='div-icon'>
                <span className="material-icons" style={{ width: '50%', cursor: 'pointer' }} >
                  more_vert
                </span>
              </div>
              <div className='div-icon'>
                <span className="material-icons" style={{ width: '50%', cursor: 'pointer' }}>
                  bar_chart
                </span>
              </div>
            </div>
          </td>
          : index === 5 || index === 7 ?
            <td {...cell.getCellProps()} key={index} className='td-row-icons5' style={{ borderRight: 'none' }}>{cell.render('Cell')}</td>
            : index === 6 ?
              <td key={index} {...cell.getCellProps()} className='td-row-icons6'>
                <div className={cell.value === 1 ? 'div-green' : cell.value === 0 ? '' : 'div-yellow'} />
              </td>
              :
              <td {...cell.getCellProps()} key={index} className='item-id'>{cell.render('Cell')}</td>
      ))}
    </tr>
  )
}

const TAbleDrop = () => {

  const columnsItems = useSelector((state) => state.columns);
  const columns = React.useMemo(() => columnsItems, [])
  const dataItems = useSelector((state) => state.data)
  const data = React.useMemo(() => dataItems, [])

  return (
    <TableContainer>
      <Table columns={columns} data={data} />
    </TableContainer>
  )
}

export default TAbleDrop