<script lang="ts">
  import Aside from './Aside.svelte';
  import InfobyteEditor from "./InfobyteEditor.svelte";
  import { currentInfobyte, baseUrl } from '../stores';
  import {
    Row,
    Col
  } from 'sveltestrap';

  let selectedInfobyte = undefined

  const unsubscribe = currentInfobyte.subscribe((value) => {
    selectedInfobyte = value;
  });

</script>

<style>
    
  h1 {
    color: var(--red);
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    text-align: center;
  }

  .padded {
    margin: 1em 1em 0 1em;
  }
 </style>

<Row>
    <Aside/>
    <Col xs="9">
 
    <section id="editor-container">
  
      <div  class="padded">
      <InfobyteEditor bind:selectedInfobyte={selectedInfobyte} />
      </div>
  
    </section>
    </Col>
  
</Row>