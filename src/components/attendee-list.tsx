import dayjs from "dayjs";
import ptbr from "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react";
import { ChangeEvent, useState } from "react";

import { attendees } from "../data/attendees";
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableCell } from "./table/table-cell";
import { TableHeader } from "./table/table-header";
import { TableRow } from "./table/table-row";

dayjs.extend(relativeTime);
dayjs.locale(ptbr);

export function AttendeeList() {
	const [search, setSearch] = useState<string>("");
	const [page, setPage] = useState<number>(1);
	const totalPages = Math.ceil(attendees.length / 10);

	function onSearchInputChange(e: ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
	}

	function goToFirstPage() {
		setPage(1);
	}

	function goToPreviousPage() {
		setPage(Math.max(page - 1, 1));
	}

	function goToNextPage() {
		setPage(Math.min(page + 1, totalPages));
	}

	function goToLastPage() {
		setPage(totalPages);
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-3 items-center">
				<h1 className="text-2xl font-bold">Participantes</h1>
				<div className="px-3 w-72 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm flex items-center gap-3">
					<Search className="size-4 text-emerald-300" />
					<input
						onChange={onSearchInputChange}
						className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm focus:ring-0"
						placeholder="Buscar participante"
					/>
				</div>
			</div>

			<Table>
				<thead>
					<tr className="border-b border-white/10">
						<TableHeader
							style={{
								width: 48,
							}}>
							<input
								type="checkbox"
								className="size-4 bg-black/20 rounded border border-white/10"
							/>
						</TableHeader>
						<TableHeader>Código</TableHeader>
						<TableHeader>Participante</TableHeader>
						<TableHeader>Data de inscrição</TableHeader>
						<TableHeader>Data do check-in</TableHeader>
						<TableHeader
							style={{
								width: 64,
							}}
						/>
					</tr>
				</thead>

				<tbody>
					{attendees.slice((page - 1) * 10, page * 10).map((attendee, i) => {
						return (
							<TableRow key={attendee.id}>
								<TableCell>
									<input
										type="checkbox"
										className="size-4 bg-black/20 rounded border border-white/10 accent-orange-400"
									/>
								</TableCell>
								<TableCell>{i}</TableCell>
								<TableCell>
									<div className="flex flex-col gap-1">
										<span className="font-semibold text-white">{attendee.name}</span>
										<span>{attendee.email.toLocaleLowerCase()}</span>
									</div>
								</TableCell>
								<TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
								<TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
								<TableCell>
									<IconButton transparent>
										<MoreHorizontal className="size-4" />
									</IconButton>
								</TableCell>
							</TableRow>
						);
					})}
				</tbody>

				<tfoot>
					<tr>
						<TableCell colSpan={3}>Mostrando 10 de {attendees.length} items</TableCell>
						<TableCell
							colSpan={3}
							className="py-3 px-4 text-sm text-zinc-300 text-right">
							<div className="inline-flex items-center gap-8">
								<span>
									Página {page} de {totalPages}
								</span>
								<div className="flex gap-1.5">
									<IconButton
										onClick={goToFirstPage}
										disabled={page === 1}>
										<ChevronsLeft className="size-4" />
									</IconButton>
									<IconButton
										onClick={goToPreviousPage}
										disabled={page === 1}>
										<ChevronLeft className="size-4" />
									</IconButton>
									<IconButton
										onClick={goToNextPage}
										disabled={page === totalPages}>
										<ChevronRight className="size-4" />
									</IconButton>
									<IconButton
										onClick={goToLastPage}
										disabled={page === totalPages}>
										<ChevronsRight className="size-4" />
									</IconButton>
								</div>
							</div>
						</TableCell>
					</tr>
				</tfoot>
			</Table>
		</div>
	);
}
