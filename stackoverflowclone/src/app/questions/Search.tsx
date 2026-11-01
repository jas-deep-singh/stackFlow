"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Search = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const search = searchParams.get("search") || "";

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newSearchParams = new URLSearchParams(searchParams);
        const formData = new FormData(e.currentTarget);
        const query = formData.get("search")?.toString() || "";
        newSearchParams.set("search", query);
        router.push(`${pathname}?${newSearchParams}`);
    };

    return (
        <form className="flex w-full flex-row gap-4" onSubmit={handleSearch}>
            <Input
                type="text"
                name="search"
                placeholder="Search questions"
                defaultValue={search}
            />
            <button className="shrink-0 rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600">
                Search
            </button>
        </form>
    );
};

export default Search;