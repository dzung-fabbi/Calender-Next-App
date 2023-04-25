import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import { useEffect, useState } from 'react'
import * as React from 'react'
import { twMerge } from 'tailwind-merge'

import homeApi from '@/api/home.api'
import { Button } from '@/components/button'
import { ModalInformation } from '@/components/modal'
import { useToggle } from '@/hooks'
import { useStore } from '@/store/useStore'
import {
  getBgColorCan,
  getBgColorCung,
  getDayName,
  getLunarDate,
} from '@/utils/helpers'

const cungSon = [
  {
    name: 'Ly',
    direction: 'Nam',
    coordinates: '157,5',
    backgroundColor: 'rgb(239 68 68 / 1)',
    color: 'black',
    son: [
      {
        name: 'Bính',
        coordinates: '157,5',
        backgroundColor: 'rgb(239 68 68 / 1)',
        color: 'black',
      },
      {
        name: 'Ngọ',
        coordinates: '172,5',
        backgroundColor: 'rgb(239 68 68 / 1)',
        color: 'black',
      },
      {
        name: 'Đinh',
        coordinates: '187,5',
        backgroundColor: 'rgb(239 68 68 / 1)',
        color: 'black',
      },
    ],
  },
  {
    name: 'Khôn',
    direction: 'Tây Nam',
    coordinates: '202,5',
    backgroundColor: 'rgb(234 179 8 / 1)',
    color: 'black',
    son: [
      {
        name: 'Mùi',
        coordinates: '202,5',
        backgroundColor: 'rgb(234 179 8 / 1)',
        color: 'black',
      },
      {
        name: 'Khôn',
        coordinates: '217,5',
        backgroundColor: 'rgb(234 179 8 / 1)',
        color: 'black',
      },
      {
        name: 'Thân',
        coordinates: '232,5',
        backgroundColor: 'white',
        color: 'black',
      },
    ],
  },
  {
    name: 'Đoài',
    direction: 'Nam',
    coordinates: '247,5',
    backgroundColor: 'white',
    color: 'black',
    son: [
      {
        name: 'Canh',
        coordinates: '247,5',
        backgroundColor: 'white',
        color: 'black',
      },
      {
        name: 'Dậu',
        coordinates: '262,5',
        backgroundColor: 'white',
        color: 'black',
      },
      {
        name: 'Tân',
        coordinates: '277,5',
        backgroundColor: 'white',
        color: 'black',
      },
    ],
  },
  {
    name: 'Càn',
    direction: 'Tây Bắc',
    coordinates: '292,5',
    backgroundColor: 'white',
    color: 'black',
    son: [
      {
        name: 'Tuất',
        coordinates: '337,5',
        backgroundColor: 'rgb(234 179 8 / 1)',
        color: 'black',
      },
      {
        name: 'Càn',
        coordinates: '307,5',
        backgroundColor: 'white',
        color: 'black',
      },
      {
        name: 'Hợi',
        coordinates: '322,5',
        backgroundColor: 'black',
        color: 'white',
      },
    ],
  },
  {
    name: 'Khảm',
    direction: 'Bắc',
    coordinates: '337,5',
    backgroundColor: 'black',
    color: 'white',
    son: [
      {
        name: 'Nhâm',
        coordinates: '337,5',
        backgroundColor: 'black',
        color: 'white',
      },
      {
        name: 'Tý',
        coordinates: '352,6',
        backgroundColor: 'black',
        color: 'white',
      },
      {
        name: 'Quý',
        coordinates: '7,5',
        backgroundColor: 'black',
        color: 'white',
      },
    ],
  },
  {
    name: 'Cấn',
    direction: 'Đông bắc',
    coordinates: '22,5',
    backgroundColor: 'rgb(234 179 8 / 1)',
    color: 'black',
    son: [
      {
        name: 'Sửu',
        coordinates: '22,5',
        backgroundColor: 'rgb(234 179 8 / 1)',
        color: 'black',
      },
      {
        name: 'Cấn',
        coordinates: '37,5',
        backgroundColor: 'rgb(234 179 8 / 1)',
        color: 'black',
      },
      {
        name: 'Dần',
        coordinates: '52,5',
        backgroundColor: 'rgb(34 197 94 / 1)',
        color: 'black',
      },
    ],
  },
  {
    name: 'Chấn',
    direction: 'Đông',
    coordinates: '67,5',
    backgroundColor: 'rgb(34 197 94 / 1)',
    color: 'black',
    son: [
      {
        name: 'Giáp',
        coordinates: '67,5',
        backgroundColor: 'rgb(34 197 94 / 1)',
        color: 'black',
      },
      {
        name: 'Mão',
        coordinates: '82,5',
        backgroundColor: 'rgb(34 197 94 / 1)',
        color: 'black',
      },
      {
        name: 'Ất',
        coordinates: '97,5',
        backgroundColor: 'rgb(34 197 94 / 1)',
        color: 'black',
      },
    ],
  },
  {
    name: 'Tốn',
    direction: 'Đông Nam',
    coordinates: '112,5',
    backgroundColor: 'rgb(34 197 94 / 1)',
    color: 'black',
    son: [
      {
        name: 'Thìn',
        coordinates: '112,5',
        backgroundColor: 'rgb(234 179 8 / 1)',
        color: 'black',
      },
      {
        name: 'Tốn',
        coordinates: '127,5',
        backgroundColor: 'rgb(34 197 94 / 1)',
        color: 'black',
      },
      {
        name: 'Tỵ',
        coordinates: '142,5',
        backgroundColor: 'rgb(239 68 68 / 1)',
        color: 'black',
      },
    ],
  },
]

function ThanSat() {
  const currentDate = useStore((state) => state.currentDate)
  const day = currentDate.format('DD')
  const month = currentDate.format('MM')
  const year = currentDate.format('YYYY')
  const currentLunarDate = getLunarDate(+day, +month, +year)
  const dayName = getDayName(currentLunarDate)
  const [thansatByMonth, setThansatByMonth] = useState<any>([])
  const [isOpen, toggleModal] = useToggle()
  const [chooseStars, setChooseStars] = useState<{
    name: string
    data: string
  }>({
    name: '',
    data: '',
  })

  const [cungSelect, setCungSelect] = useState<any>({
    name: 'Ly',
    direction: 'Nam',
    coordinates: '157,5',
    backgroundColor: 'rgb(239 68 68 / 1)',
    color: 'black',
    son: [
      {
        name: 'Bính',
        coordinates: '157,5',
        backgroundColor: 'rgb(239 68 68 / 1)',
        color: 'black',
      },
      {
        name: 'Ngọ',
        coordinates: '172,5',
        backgroundColor: 'rgb(239 68 68 / 1)',
        color: 'black',
      },
      {
        name: 'Đinh',
        coordinates: '187,5',
        backgroundColor: 'rgb(239 68 68 / 1)',
        color: 'black',
      },
    ],
  })
  useEffect(() => {
    ;(async () => {
      try {
        const responseData = await homeApi.getThanSatInfo(dayName[2] || '')
        const tmp = responseData.than_sat_by_month
        // @ts-ignore
        setThansatByMonth(tmp[`month_${month}`])
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    })()
  }, [currentDate])

  const jsUcfirst = (string: string) => {
    const tmp = string.toLowerCase()
    return tmp.charAt(0).toUpperCase() + tmp.slice(1)
  }

  const handleClickStars = (el: { name: string; property: string }) => {
    setChooseStars({
      name: el?.name || '',
      data: el?.property || '',
    })
    toggleModal()
  }

  const chooseCung = (cung: string, son: string) => {
    const tmp = cungSon.find((el: any) => el.name === cung)
    const cungNew = { ...tmp }
    if (son && cungNew) {
      // @ts-ignore
      const tmp1 = cungNew.son.filter((x: any) => x.name === son)
      cungNew.son = tmp1
      setCungSelect(cungNew)
    } else {
      setCungSelect(tmp)
    }
  }

  const renderthansatByMonth = () => {
    const saoCung = thansatByMonth.filter(
      (x: any) => x.direction === cungSelect.name && x.cung_son === 1
    )

    return (
      <TableContainer component={Paper}>
        <Table aria-label="am phu thai tue">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={6}>
                {month}/{year}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                width="50%"
                align="center"
                colSpan={6}
                style={{
                  backgroundColor: cungSelect.backgroundColor,
                  color: cungSelect.color,
                  fontWeight: 'bold',
                }}
              >
                {cungSelect.name}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                width="25%"
                align="left"
                colSpan={6}
                className="text-center"
              >
                <span className="text-red-tag text-red-primary text-primary">
                  {saoCung.map((x: any, idx: number) => {
                    return (
                      <>
                        <span
                          className="cursor-pointer"
                          onClick={() => handleClickStars(x.sao)}
                        >
                          &nbsp;{jsUcfirst(x.sao.name)}&nbsp;
                        </span>
                        {idx < saoCung.length - 1 ? ',' : ''}
                      </>
                    )
                  })}
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              {cungSelect.son.map((row: any, idx: number) => {
                return (
                  <TableCell
                    width="16.6%"
                    align="center"
                    colSpan={2}
                    key={idx}
                    style={{
                      backgroundColor: row.backgroundColor,
                      color: row.color,
                      fontWeight: 'bold',
                    }}
                  >
                    {row.name}
                  </TableCell>
                )
              })}
            </TableRow>
            <TableRow>
              {cungSelect.son.map((el: any) => {
                const saoSon = thansatByMonth.filter(
                  (x: any) => x.direction === el.name && x.cung_son === 2
                )
                return (
                  <>
                    <TableCell
                      width="8.3%"
                      align="left"
                      colSpan={2}
                      className="text-center"
                    >
                      <span className="text-red-tag text-red-primary text-primary">
                        {saoSon.map((x: any, idx: number) => {
                          return (
                            <>
                              <span
                                className="cursor-pointer"
                                onClick={() => handleClickStars(x.sao)}
                              >
                                &nbsp;{jsUcfirst(x.sao.name)}
                              </span>
                              {idx < saoSon.length - 1 ? ',' : ''}
                            </>
                          )
                        })}
                      </span>
                    </TableCell>
                  </>
                )
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <div className="than_sat overflow-hidden">
      <>
        <div
          className={twMerge(
            'circle w-full max-w-[600px] aspect-square overflow-hidden',
            'animate-zoomOut'
          )}
        >
          {cungSon.map((x: any) => {
            return (
              <div
                key={x.name}
                className="li1 part-layout transition-all hover:bg-black/10"
              ></div>
            )
          })}
          <div className="circle-layout">
            {cungSon.map((x: any) => {
              return (
                <>
                  {x.son.map((x1: any) => {
                    return (
                      <div key={x1.name} className="li none-border">
                        <div className="text">
                          <span>{x1.coordinates}°</span>
                        </div>
                      </div>
                    )
                  })}
                </>
              )
            })}
            <div className="child">
              {cungSon.map((x: any) => {
                return (
                  <>
                    {x.son.map((x1: any) => {
                      const bgColor = getBgColorCan(x1.name)
                      return (
                        <div
                          key={x1.name}
                          className={`li ${bgColor} hover:opacity-70`}
                          onClick={() => {
                            chooseCung(x.name, x1.name)
                          }}
                        >
                          <div
                            className={twMerge(
                              'text',
                              bgColor === 'bg-black' && 'text-white'
                            )}
                          >
                            <span>{x1.name}</span>
                          </div>
                        </div>
                      )
                    })}
                  </>
                )
              })}
              <div className="child-1">
                {cungSon.map((x: any) => {
                  return (
                    <div key={x.name} className="li1 hover:opacity-70">
                      <div className="text1">
                        <span
                          onClick={() => {
                            chooseCung(x.name, '')
                          }}
                        >
                          {x.direction}
                        </span>
                      </div>
                    </div>
                  )
                })}
                <div className="child-2">
                  {cungSon.map((el: any) => {
                    const bgColor = getBgColorCung(el.name)
                    return (
                      <div
                        key={el.name}
                        className={`li1 ${bgColor} hover:opacity-70`}
                      >
                        <div
                          className={twMerge(
                            'text1',
                            bgColor === 'bg-black' && 'text-white'
                          )}
                        >
                          <span onClick={() => chooseCung(el.name, '')}>
                            {el.name}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                  <div className="child-3">
                    <div>{month}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="flicker mt-5 mb-10 text-center">
          * Click vào cung hoặc sơn để hiển thị thông tin sao
        </p>
      </>
      {renderthansatByMonth()}

      <ModalInformation
        isOpen={isOpen}
        toggleModal={toggleModal}
        titleModal={`Sao ${jsUcfirst(chooseStars.name)}`}
      >
        <div>{chooseStars.data}</div>
        <div className="flex items-center justify-end mt-5 gap-x-4">
          <Button
            primary
            onClick={toggleModal}
            className="h-[2.5rem] pt-2 w-[2.5rem]"
          >
            OK
          </Button>
        </div>
      </ModalInformation>
    </div>
  )
}

export default ThanSat
