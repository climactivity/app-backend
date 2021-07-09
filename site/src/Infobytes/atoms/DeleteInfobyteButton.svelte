<script lang="ts">
  import { Confirm } from "svelte-confirm";
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from "sveltestrap";
  import { currentInfobyte } from "../../stores";
  import { deleteInfobyte } from "../InfobyteService";

  export let infobyteId: string;

  let open = false;
  const toggle = () => {
    open = !open;
    currentInfobyte.set(null);
  };

  const handleDelete = () => {
    if (!infobyteId) return;

    deleteInfobyte(infobyteId).then(() => (open = true));
  };
</script>

<Confirm
  let:confirm={confirmThis}
  confirmTitle="Infobyte Löschen"
  cancelTitle="Abbrechen"
>
  <Button color="danger" on:click={confirmThis(handleDelete)}>Löschen</Button>
  <span slot="title">
    Bist du dir sicher dass du dieses Infobyte löschen möchtest?
  </span>
  <span slot="description"
    >Das löschen eines Infobytes kann aktuell nicht rückgängig gemacht werden!
  </span>
</Confirm>

<Modal isOpen={open} {toggle} transitionOptions>
  <ModalHeader>Infobyte wurde erfolgreich gelöscht!</ModalHeader>
  <ModalBody>
    Das Infobyte konnte erfolgreich gelöscht werden. Aktuell ist es hilfreich
    die Anwendung neu zu laden um sicher zu gehen dass auch wirklich alles
    richtig gespeichert wurde.
  </ModalBody>
  <ModalFooter>
    <Button color="danger" on:click={toggle}>Schließen</Button>
  </ModalFooter>
</Modal>
