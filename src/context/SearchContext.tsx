"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
    isSearchOpen: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    openSearch: () => void;
    closeSearch: () => void;
    toggleSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const openSearch = () => setIsSearchOpen(true);
    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery(""); // Optional: clear query on close
    };
    const toggleSearch = () => setIsSearchOpen((prev) => !prev);

    return (
        <SearchContext.Provider
            value={{
                isSearchOpen,
                searchQuery,
                setSearchQuery,
                openSearch,
                closeSearch,
                toggleSearch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
};
