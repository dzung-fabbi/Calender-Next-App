import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useEffect, useState } from 'react'
import * as React from 'react'

import homeApi from '@/api/home.api'
import { Button } from '@/components/button'
import { ModalInformation } from '@/components/modal'
import { useToggle } from '@/hooks'
import type { ThanSatFormValue } from '@/models'
import { useStore } from '@/store/useStore'
import { MONTH_PROPERTY } from '@/utils/constant'
import { getDayName, getLunarDate } from '@/utils/helpers'

const cungSon = [
  {
    name: 'Ly',
    direction: 'Nam',
    coordinates: '157,5',
    son: [
      {
        name: 'Bính',
        coordinates: '157,5',
      },
      {
        name: 'Ngọ',
        coordinates: '172,5',
      },
      {
        name: 'Đinh',
        coordinates: '187,5',
      },
    ],
  },
  {
    name: 'Khôn',
    direction: 'Tây Nam',
    coordinates: '202,5',
    son: [
      {
        name: 'Mùi',
        coordinates: '202,5',
      },
      {
        name: 'Khôn',
        coordinates: '217,5',
      },
      {
        name: 'Thân',
        coordinates: '232,5',
      },
    ],
  },
  {
    name: 'Đoài',
    direction: 'Nam',
    coordinates: '247,5',
    son: [
      {
        name: 'Canh',
        coordinates: '247,5',
      },
      {
        name: 'Dậu',
        coordinates: '262,5',
      },
      {
        name: 'Tân',
        coordinates: '277,5',
      },
    ],
  },
  {
    name: 'Càn',
    direction: 'Tây Bắc',
    coordinates: '292,5',
    son: [
      {
        name: 'Tuất',
        coordinates: '337,5',
      },
      {
        name: 'Càn',
        coordinates: '307,5',
      },
      {
        name: 'Hợi',
        coordinates: '322,5',
      },
    ],
  },
  {
    name: 'Khảm',
    direction: 'Bắc',
    coordinates: '337,5',
    son: [
      {
        name: 'Nhâm',
        coordinates: '337,5',
      },
      {
        name: 'Tý',
        coordinates: '352,6',
      },
      {
        name: 'Quý',
        coordinates: '7,5',
      },
    ],
  },
  {
    name: 'Cấn',
    direction: 'Đông bắc',
    coordinates: '22,5',
    son: [
      {
        name: 'Sửu',
        coordinates: '22,5',
      },
      {
        name: 'Cấn',
        coordinates: '37,5',
      },
      {
        name: 'Dần',
        coordinates: '52,5',
      },
    ],
  },
  {
    name: 'Chấn',
    direction: 'Đông',
    coordinates: '67,5',
    son: [
      {
        name: 'Giáp',
        coordinates: '67,5',
      },
      {
        name: 'Mão',
        coordinates: '82,5',
      },
      {
        name: 'Ất',
        coordinates: '97,5',
      },
    ],
  },
  {
    name: 'Tốn',
    direction: 'Đông Nam',
    coordinates: '112,5',
    son: [
      {
        name: 'Thìn',
        coordinates: '112,5',
      },
      {
        name: 'Tốn',
        coordinates: '127,5',
      },
      {
        name: 'Tỵ',
        coordinates: '142,5',
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
  // const [thansatByMonth, setThansatByMonth] = useState<any>([])
  const [thansatByYear, setThansatByYear] = useState<any>([])
  const [isOpen, toggleModal] = useToggle()
  const [chooseStars, setChooseStars] = useState<{
    name: string
    data: string
  }>({
    name: '',
    data: '',
  })

  const [cung, setCung] = useState<any>({
    name: 'Ly',
    direction: 'Nam',
    coordinates: '157,5',
    son: [
      {
        name: 'Bính',
        coordinates: '157,5',
      },
      {
        name: 'Ngọ',
        coordinates: '172,5',
      },
      {
        name: 'Đinh',
        coordinates: '187,5',
      },
    ],
  })

  const [thanSatInfo, setThanSatInfo] = useState<ThanSatFormValue>()
  useEffect(() => {
    ;(async () => {
      try {
        const responseData = await homeApi.getThanSatInfo(dayName[2] || '')
        setThanSatInfo(responseData)

        const arrTmp = responseData.than_sat_by_month.map((el: any) => {
          const property =
            MONTH_PROPERTY[parseInt(month, 10) as keyof typeof MONTH_PROPERTY]
          return {
            name: el[property].split(' '),
            sao: el.sao,
          }
        })
        // setThansatByMonth(arrTmp)
        setThansatByYear(responseData.than_sat_by_year)
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

  if (!thanSatInfo) return null

  const renderThansatByYear = () => {
    const tmp = thansatByYear.filter((x: { direction: any; sao: any }) =>
      x.direction.includes(cung.name)
    )
    return (
      <TableContainer component={Paper}>
        <Table aria-label="am phu thai tue">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={6}>
                Năn {year}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell width="50%" align="center" colSpan={6}>
                {cung.name}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell width="25%" align="left" colSpan={6}>
                <span className="text-red-tag text-red-primary text-primary">
                  {tmp.map((x: any) => {
                    return (
                      <>
                        <span
                          className="cursor-pointer"
                          onClick={() => handleClickStars(x.sao)}
                        >
                          {jsUcfirst(x.sao.name)}
                        </span>
                        ,
                      </>
                    )
                  })}
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              {cung.son.map((row: any) => {
                return (
                  <TableCell width="16.6%" align="center" colSpan={2}>
                    {row.name}
                  </TableCell>
                )
              })}
            </TableRow>
            <TableRow>
              {cung.son.map((row: any) => {
                const tmp = thansatByYear.filter(
                  (x: { direction: any; sao: any }) =>
                    x.direction.includes(row.name)
                )
                return (
                  <>
                    <TableCell width="8.3%" align="left" colSpan={2}>
                      <span className="text-red-tag text-red-primary text-primary">
                        {tmp.map((x: any) => {
                          return (
                            <>
                              <span
                                className="cursor-pointer"
                                onClick={() => handleClickStars(x.sao)}
                              >
                                {jsUcfirst(x.sao.name)}
                              </span>
                              ,
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

  const chooseCung = (name: string) => {
    const tmp = cungSon.find((el: any) => el.name === name)
    setCung(tmp)
  }

  return (
    <div className="than_sat flex flex-col gap-y-10">
      <div className="circle">
        {cungSon.map((x: any) => {
          return (
            <>
              {x.son.map((x1: any) => {
                return (
                  <div key={x1.name} className="li none-border">
                    <div className="text">
                      <span onClick={() => chooseCung(x.name)}>
                        {x1.coordinates}°
                      </span>
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
                  return (
                    <div key={x1.name} className="li">
                      <div className="text">
                        <span onClick={() => chooseCung(x.name)}>
                          {x1.name}
                        </span>
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
                <div key={x.name} className="li1">
                  <div className="text1">
                    <span onClick={() => chooseCung(x.name)}>
                      {x.direction}
                    </span>
                  </div>
                </div>
              )
            })}
            <div className="child-2">
              {cungSon.map((el: any) => {
                return (
                  <div key={el.name} className="li1">
                    <div className="text1">
                      <span onClick={() => chooseCung(el.name)}>{el.name}</span>
                    </div>
                  </div>
                )
              })}
              <div className="child-3">
                <div>{year}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderThansatByYear()}
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
