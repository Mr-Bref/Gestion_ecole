import { useEffect, useState } from 'react';
import PageHeader from './PageHeader';
import { useParams } from 'react-router-dom';
import { Eleve, columns } from "./Column/ElevesColumns";
import { DataTable } from './TableComponents/Data-table';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { handleChange, handleSubmit } from '../lib/formHandlers'; // Import the reusable functions
import apiClient from '@/config';

export interface Classe {
  id: number;
  nom: string;
  effectif: number;
}

type ClasseLink = {
  id: number;
  nom: string;
};

type Niveau = {
  id: number;
  libelle: string;
};

const defaultNiveau: Niveau = {
  id: 0,
  libelle: ''
};

const defaultClasseLink: ClasseLink = {
  id: 0,
  nom: ''
};

export default function ClasseInfo() {
  const [data, setData] = useState<Eleve[]>([]);
  const [niveau, setNiveau] = useState<Niveau>(defaultNiveau);
  const [open, setOpen] = useState<boolean>();
  const [classeLink, setClasseLink] = useState<ClasseLink>(defaultClasseLink);
  const { classeId } = useParams();
  const [formData, setFormData] = useState({
    classe_id: classeId,
    nom: '',
    prenom: '',
    date_naissance: '',
    lieu_naissance: '',
    sexe: '',
    adresse: '',
    email: '',
    telephone: '',
    photo: '',
  });


  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/classes/${classeId}`)
      .then(response => {
        const data = response.data;

        setData(data.classe.eleves);
        setNiveau(data.classe.niveaux);
        setClasseLink({
          id: data.classe.id,
          nom: data.classe.nom
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [classeId]);

  // Function to handle form submission
  const submitForm = async (formDataToSend: FormData) => {
    try {
      const response = await apiClient.request({
        method: 'POST',
        url: `/eleves`,
        data: formDataToSend
      });
      window.location.reload()
      console.log('Form submission successful:', response.data);
      setOpen(false);
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };
  async function updateRow(formData: FormData): Promise<any> {
    formData.append('classe_id', classeId as string);
    formData.append('_method', 'put');
    try { 
      const response = await apiClient.post(`/eleves/${formData.get('user_id')}`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });

      console.log('Form submission successful:', response.data);
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  }



  return (
    <div className='flex item-center flex-col h-full'>
      <PageHeader breadcumb={[
        { text: 'Niveau', link: "/dashboard/niveau" },
        { text: niveau?.libelle || 'Loading...', link: niveau ? `/dashboard/niveau/${niveau.id}` : '#' },
        { text: classeLink?.nom || 'Loading...', link: classeLink ? `/dashboard/niveau/${niveau?.id}/classe/${classeLink.id}` : '#' }
      ]} />

      <div className="container overflow-y-auto mx-auto py-10">
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogTrigger asChild>
            <Button variant="outline" className='mb-4'>
              <span className="hidden lg:block">Nouvelle Inscription</span>
              <Plus size={15} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Inscription</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={(e) => handleSubmit(e, formData, submitForm)} // Use the reusable handleSubmit function
            >
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    id="nom"
                    placeholder='Entrer votre nom ici'
                    value={formData.nom}
                    onChange={(e) => handleChange(e, setFormData)} // Use the reusable handleChange function
                  />
                </div>
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input
                    id="prenom"
                    placeholder='Entrer votre prénom ici'
                    value={formData.prenom}
                    onChange={(e) => handleChange(e, setFormData)} // Use the reusable handleChange function
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date_naissance">Date de naissance</Label>
                <Input
                  id="date_naissance"
                  type="date"
                  placeholder='Date de naissance'
                  value={formData.date_naissance}
                  onChange={(e) => handleChange(e, setFormData)} // Use the reusable handleChange function
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lieu_naissance">Lieu de naissance</Label>
                <Input
                  id="lieu_naissance"
                  placeholder='Lieu de naissance'
                  value={formData.lieu_naissance}
                  onChange={(e) => handleChange(e, setFormData)} // Use the reusable handleChange function
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sexe">Sexe</Label>
                <Select
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, sexe: value }))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="sexe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculin">Masculin</SelectItem>
                    <SelectItem value="feminin">Feminin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Input
                  id="adresse"
                  placeholder='Entrer votre adresse ici'
                  value={formData.adresse}
                  onChange={(e) => handleChange(e, setFormData)} // Use the reusable handleChange function
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder='Entrer votre email ici'
                  value={formData.email}
                  onChange={(e) => handleChange(e, setFormData)} // Use the reusable handleChange function
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  placeholder='Entrer votre numéro de téléphone ici'
                  value={formData.telephone}
                  onChange={(e) => handleChange(e, setFormData)} // Use the reusable handleChange function
                />
              </div>
              <DialogFooter className="sm:justify-end">
                <Button variant="default" type="submit" className="flex mb-4">
                  <span className="lg:block">Valider</span>
                </Button>
                <Button variant="outline" className="mb-4 hidden lg:block" onClick={() => setOpen(false)}>
                  <span>Annuler</span>
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <DataTable
          columns={columns}
          data={data}
          endpoint='eleves'
          updateRow={updateRow} />
      </div>
    </div>
  );
}
