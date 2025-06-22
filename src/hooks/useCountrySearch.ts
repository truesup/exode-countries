import { useState } from 'react'

export const useCountrySearch = () => {
  const [searchValue, setSearchValue] = useState('')
  const [filterMode, setFilterMode] = useState<'name' | 'code' | null>(null)

  return {
    searchValue,
    setSearchValue,
    filterMode,
    setFilterMode,
  }
}
