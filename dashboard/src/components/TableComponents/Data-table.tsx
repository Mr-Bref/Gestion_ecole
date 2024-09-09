import { useState, useEffect } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "../ui/input"
import DataTablePagination from "./TablePagination"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { handleValidation } from "@/lib/otherHandlers"
import apiClient from "@/config"
import { Label } from "../ui/label"

type UpdateRowFn = (newData: FormData) => Promise<any>;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  endpoint: string
  updateRow: UpdateRowFn
}




export function DataTable<TData, TValue>({
  updateRow,
  columns,
  data,
  endpoint
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [dialogData, setDialogData] = useState<TData>()
  const [newDialogData, setNewDialogData] = useState<TData>()
  const [opendialogue, setOpenDialogue] = useState<boolean>(false)
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [hasChanges, setHasChanges] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Correctly set the newDialogData with the photo file
      //@ts-ignore
      setNewDialogData((prevData) => ({
        ...prevData,
        photo: file,  // Assign the File object
      }));
      setImagePreview(URL.createObjectURL(file));  // Preview the selected image
    }
  };

  function handleSave() {
    if (dialogData && newDialogData) {
      setIsLoading(true);

      // Create FormData from newDialogData
      const formData = new FormData();
      for (const key in newDialogData) {
        if (Object.prototype.hasOwnProperty.call(newDialogData, key)) {
          formData.append(key, newDialogData[key] as any);
        }
      }
      let dialogphoto = newDialogData?.photo as File
      if (dialogphoto) {
        formData.set('photo',dialogphoto )
        console.log(newDialogData.photo)
      }
      
      

      updateRow(formData)  // Call the passed function
        .then(() => {
          console.log('Update successful');
          //  window.location.reload()

        })
        .catch((error) => {
          console.error('Update failed:', error);
        })
        .finally(() => {
          setIsLoading(false);
          setOpenDialogue(false);
          setImagePreview(null);
        });
    }
  }

  function handleCancel() {
    setImagePreview(null)
    setOpenDialogue(false)
  }
  function compareData(): boolean {
    const dialogKeys = Object.keys(dialogData as Object);
    const newDialogKeys = Object.keys(newDialogData as Object);
    if (dialogKeys.length !== newDialogKeys.length) {
      return false;
    }
    //@ts-ignore
    return dialogKeys.every(key => dialogData[key] === newDialogData[key]);
  }
  useEffect(() => {
    if (dialogData && newDialogData) {
      setHasChanges(!compareData());
    }
  }, [newDialogData, dialogData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row: any, columnIds, filterValue) => {
      // Columns to search in
      const searchFields = ["nom", "prenom", "email", "matricule"];

      // Check if any of the columns contain the filter value
      return searchFields.some((field: string) => {
        const value = row.original[field];
        return value?.toString().toLowerCase().includes(filterValue.toLowerCase());
      });
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
      columnFilters,
      globalFilter,
    }
  })
  return (
    <div>
      <div className="rounded-md border overflow-y-auto">
        <div className="flex items-center justify-between py-4 px-2">
          <Input
            placeholder="Rechercher par nom, prenom, email ou matricule..."
            value={table.getState().globalFilter || ""}
            onChange={(event) => {
              table.setGlobalFilter(event.target.value)
            }}
            className="max-w-sm"
          />
          <div className="flex flex-col lg:flex-row">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto mx-4">
                  Colonnes
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {table
                  .getAllColumns()
                  .filter(
                    (column) => column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize px-12"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="bg-primary mx-2"
              disabled={table.getFilteredSelectedRowModel().rows.every(row => row.original.verified === 0) === false
                || table.getFilteredSelectedRowModel().rows.length === 0} onClick={e => {
                  // @ts-ignore
                  handleValidation(e, table.getFilteredSelectedRowModel().rows.map(row => parseInt(row.original.user_id)), 'users/toggle-verification')
                }}>
              Valider Inscription
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    setOpenDialogue(true)
                    setDialogData(row.original)
                    setNewDialogData(row.original)
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}
                        className="cursor-pointer"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Vide
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
      <Dialog open={opendialogue} onOpenChange={setOpenDialogue}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Information</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission
              handleSave(); // Call your save function
            }}
          >
            <div className="max-h-[600px] overflow-y-auto px-4">
              {/* Priority Fields First */}
              {dialogData &&
                ["photo", "nom", "prenom", "matricule", "sexe", "adresse"].map((field) => {
                  // @ts-ignore
                  const fieldValue = dialogData[field];

                  if (fieldValue !== undefined) {
                    if (field === "photo") {

                      return (
                        <div key={field} className="border border-black">
                          {/* Image upload logic with preview */}
                          <label htmlFor="photo">
                            {imagePreview ? (
                              <img src={imagePreview} alt="Image preview" className="w-32 h-32 object-cover" />
                            ) : (
                              <img src={fieldValue} alt="Placeholder" className="w-32 h-32 object-cover" />
                            )}
                          </label>
                          <Input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={handleImageChange} // Handle file selection
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div key={field} className="text-md py-1">
                          <Label htmlFor={field} className="capitalize font-semibold">
                            {field}:
                          </Label>
                          <Input
                            id={field}
                            defaultValue={fieldValue as string}
                            className="my-1"
                            onChange={(e) =>
                              //@ts-ignore
                              setNewDialogData({
                                ...newDialogData,
                                [field]: e.target.value,
                              })
                            }
                          />
                        </div>
                      );
                    }
                  }
                  return null;
                })}

              {/* Other Fields */}
              {dialogData &&
                Object.entries(dialogData)
                  .filter(
                    ([key]) =>
                      ![
                        "nom",
                        "prenom",
                        "matricule",
                        "sexe",
                        "user_id",
                        "id",
                        "adresse",
                        "photo",
                      ].includes(key)
                  )
                  .map(([key, value]) => (
                    <div key={key} className="text-md py-1">
                      <Label htmlFor={key} className="capitalize font-semibold">
                        {key}:
                      </Label>
                      <Input
                        id={key}
                        defaultValue={value as string}
                        className="my-1"
                        onChange={(e) =>
                          //@ts-ignore
                          setNewDialogData({
                            ...newDialogData,
                            [key]: e.target.value,
                          })
                        }
                      />
                    </div>
                  ))}
            </div>

            <DialogFooter>
              <Button type="submit" disabled={!hasChanges || isLoading}>
                Enregistrer
              </Button>
              <Button variant="ghost" onClick={handleCancel} type="button">
                Annuler
              </Button>
            </DialogFooter>
          </form>

        </DialogContent>
      </Dialog>


    </div>
  )
}
