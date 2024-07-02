"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (data: any) => {
    console.log("Form data:", data);
    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Server response:", response);

    if (response.ok) {
      setIsDialogOpen(true);
      reset();
    } else {
      alert("Erro ao enviar dados. Por favor, tente novamente.");
    }
  };

  const closeModal = () => {
    setIsDialogOpen(false);
    reset();
  };

  const whatsappUrl = "https://wa.me/55993756210";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full min-h-screen bg-gray-950 text-gray-50">
      <div className="flex items-center justify-center p-8 md:p-12">
        <img
          src="/placeholder.svg"
          alt="Capture data"
          className="max-w-full h-auto rounded-lg"
        />
      </div>
      <div className="flex items-center justify-center p-8 md:p-12">
        <form
          className="w-full max-w-md space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-1.5">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              {...register("name", { required: "Nome é obrigatório" })}
              className="text-gray-800"
              placeholder="Qual seu nome?"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Celular</Label>
            <Input
              id="phone"
              {...register("phone", { required: "Celular é obrigatório" })}
              className="text-gray-800"
              placeholder="Seu WhatsApp"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email é obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Endereço de email inválido",
                },
              })}
              className="text-gray-800"
              placeholder="Seu e-mail"
            />
          </div>
          <Button type="submit">Enviar</Button>
        </form>
      </div>
      <Modal
        isOpen={isDialogOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        contentLabel="Thank You Modal"
      >
        <h2 className="text-xl font-bold flex justify-center mb-5 text-gray-700">
          Muito Obrigado!
        </h2>
        <p>
          Agradecemos por enviar suas informações. Entraremos em contato em
          breve!
        </p>
        <div className="flex justify-center items-center mt-10">
          {/* <Button onClick={closeModal}>Fechar</Button> */}
          <Link
            href={whatsappUrl}
            target="_blank"
            className="inline-flex h-10 items-center justify-center rounded-md bg-[#25D366] px-6 text-sm font-medium text-white shadow transition-colors hover:bg-[#128C7E] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            <PhoneIcon className="mr-2 h-5 w-5" />
            Fale conosco no WhatsApp
          </Link>
        </div>
      </Modal>
    </div>
  );
}

function PhoneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
