
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "../ui/checkbox"
import { disableUser, handleValidation } from "@/lib/otherHandlers"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Eleve = {
  id: number,
  user_id: number,
  matricule: string,
  date_naissance: string,
  lieu_naissance: string,
  nom: string,
  prenom: string,
  email: string
  sexe: string,
  statut: 0 | 1,
  verified: 0 | 1
}

export const columns: ColumnDef<Eleve>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"

      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        onClick={(event) => event.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nom",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "prenom",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prenom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "matricule",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Matricule
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "date_naissance",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date de Naissance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "lieu_naissance",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lieu de Naissance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "statut",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stutus Compte
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return row.original.statut == 0 ? "Inactif" : "Actif"
    }
  },
  {
    accessorKey: "verified",
    header: ({ column }) => {
      return (
        <Button
          variant="secondary"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Verifié
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return row.original.verified == 0 ? "Non" : "Oui"
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const eleve = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(event) => event.stopPropagation()} >
            <Button variant="link" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem
              onClick={(event) => {
                navigator.clipboard.writeText(eleve.user_id.toString())
                event.stopPropagation()
              }
            } 
            >
            Copier ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {eleve.verified == 0 && <DropdownMenuItem onClick={e=>handleValidation( e,[eleve.user_id], 'users/toggle-verification')}> Valider Inscription</DropdownMenuItem>}
          <DropdownMenuItem onClick={e=>disableUser(e,[eleve.user_id], 'users/toggle-status')}>{eleve.statut == 0 ? "Activer" : "Desactiver"} </DropdownMenuItem>
          <DropdownMenuItem>Voir</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu >
      )
    },
  },

]