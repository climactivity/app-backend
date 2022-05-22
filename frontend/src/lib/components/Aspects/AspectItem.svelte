<script lang="ts">
  import { NotificationDisplay, notifier } from "@beyonk/svelte-notifications";
  import { Confirm } from "svelte-confirm";
  import type Aspect from "./AspectTypes";
  import { createEventDispatcher } from "svelte";
  import { postAspect } from "./AspectData";
  import { isProd } from "../../stores/stores";
  import Rewardform from "$lib/components/Rewards/Rewardform.svelte";
  import { Reward } from "$lib/components/Rewards/RewardTypes";

  export let aspect: Aspect;

  let newFactor = {
    name: "",
    intro: "",
  };
  const dispatch = createEventDispatcher();
  let waiting = false;
  function handleDelete() {
    dispatch("deleteAspect", {
      aspect: aspect,
    });
    aspect = null;
  }

  function handleAdd() {
    dispatch("addAspect", {
      aspect: aspect,
    });
  }
  let currentOption = {
    option: "",
    reward: new Reward(),
    level: 0,
    co2value: 0.0,
    waterFactor: 0.0,
  };
</script>

<row>
  <div >
    <h4 class="mt-3">Current Aspect</h4>
  </div>

  <div >
    <confirm let:confirm={confirmDelete}>
      <button  on:click={() => confirmDelete(handleDelete)}
        >Remove</button
      >
    </confirm>
  </div>
</row>

{#if aspect != null}
  <form id="form">
    <div>
      <div>
        <divGroup>
          <!-- <divGroupAddon addonType="prepend">
                        <divGroupText>@</divGroupText>
                    </divGroupAddon> -->
          <input placeholder="Name des Aspektes" bind:value={aspect.name} />
        </divGroup>
      </div>
      <!-- <div>
                <divGroup>
                    <divGroupAddon addonType="prepend">
                        <divGroupText>@</divGroupText>
                    </divGroupAddon>
                    <div placeholder="icon" />
                </divGroup>
            </div> -->
    </div>
    <div>
      <div>
        <h5 class="mt-3">Description</h5>
        <card body>
          <label for="title">Title</label>
          <input
            id="title"
            placeholder="Titel in der App"
            bind:value={aspect.title}
          />

          <label for="sector">Sektor</label>
          <select
            placeholder="sector"
            bind:value={aspect.bigpoint}
            type="select"
          >
            <option value={null}> -- Sektor auswählen--</option>
            <option value={"ernaehrung"}>Zelt der Ernährung</option>
            <option value={"energy"}>Zelt der Energie</option>
            <option value={"mobility"}>Zelt der Mobilität</option>
            <option value={"indirect_emissions"}>Zelt des Konsums</option>
            <option value={"private_engagement"}
              >Zelt des privaten Engagements</option
            >
            <option value={"public_engagement"}
              >Zelt des öffentlichen Engagements</option
            >
            <option value={"accounting"}>Bilanzierung</option>
          </select>

          <label for="themenmonat">Themenmonat</label>
          <select
            placeholder="themenmonat"
            bind:value={aspect.themenmonat}
            type="select"
          >
            <option value={null}> -- Themenmonat auswählen--</option>
            <option value={"bilanzierung"}>Bilanzierung</option>
            <option value={"ernaehrung"}>Ernährung</option>
            <option value={"sich_informieren"}>Sich informieren</option>
            <option value={"mobilitaet_zu_lande"}>Mobilität zu Lande</option>
            <option value={"strom_produzieren_und_sparen"}
              >Strom produzieren und sparen</option
            >
            <option value={"klimaschutzengagement_als_privatperson"}
              >Klimaschutzengagement als Privatperson</option
            >
            <option value={"dinge_teilen"}>Dinge teilen</option>
            <option value={"klimaschutz_und_geld"}>Klimaschutz und Geld</option>
            <option value={"waerme"}>Wärme</option>
            <option value={"klimaschutz_in_schule_und_betrieb"}
              >Klimaschutz in Schule und Betrieb</option
            >
            <option value={"bewusst_einkaufen"}>Bewusst einkaufen</option>
            <option value={"urlaub_und_fliegen"}>Urlaub und Fliegen</option>
            <option value={"gemeinsam_fuer_den_klimaschutz"}
              >Gemeinsam für den Klimaschutz</option
            >
          </select>

          <label for="template-type">Template type</label>
          <select
            placeholder="template-type"
            bind:value={aspect.templateType}
            type="select"
          >
            <option value={null}> -- Entitätenart--</option>
            <option value={"tree"}>Baum</option>
            <option value={"bush"}>Busch</option>
            <option value={"small"}>Kleinkram</option>
          </select>

          <label for="region">Region</label>
          <select
            id="region"
            name="region"
            type="select"
            bind:value={aspect.forRegion}
          >
            <option value={null}> -- Region -- </option>
            <option>DE</option>
          </select>

          <label for="language">Sprache</label>
          <select
            id="language"
            name="language"
            type="select"
            bind:value={aspect.forLanguage}
          >
            <option value={null}> -- Sprache -- </option>

            <option>DE</option>
            <option>EN</option>
          </select>
          <label for="message">Einleitungstext</label>
          <input
            id="message"
            type="textarea"
            placeholder="description"
            bind:value={aspect.frontmatter}
          />
        </card>
        <div>
          <h5 class="mt-3">Gesichtspunkte</h5>

          <card body>
            <label>Gesichtspunkte</label>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Intro</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {#each aspect.localizedFactors == null ? [] : aspect.localizedFactors as factor}
                  <tr>
                    <th>{factor.id}</th>
                    <td>
                      <input
                        id="factor_name"
                        type="text"
                        placeholder="Factor name"
                        bind:value={factor.name}
                      />
                    </td>
                    <td>
                      <input
                        id="factor_intro"
                        type="text"
                        placeholder="Factor intro"
                        bind:value={factor.intro}
                      />
                    </td>
                    <td>
                      <div />
                      <button
                        type="button"
                        on:click={(e) => {
                          e.preventDefault();
                          aspect.localizedFactors =
                            aspect.localizedFactors.filter(
                              (f) => f.id !== factor.id,
                            );
                          aspect.localizedFactors = aspect.localizedFactors.map(
                            (f, i) => {
                              f.id = i;
                              return f;
                            },
                          );
                        }}
                        >-
                      </button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
            <label>Gesichtspunkt hinzufügen</label>
            <card body>
              <label for="gesichtspunkt_name">Name</label>
              <input
                id="gesichtspunkt_name"
                type="text"
                placeholder="Name"
                bind:value={newFactor.name}
              />
              <label for="gesichtspunkt_name">Intro</label>
              <input
                id="gesichtspunkt_intro"
                type="text"
                placeholder="Intro"
                bind:value={newFactor.intro}
              />
              <button
                disabled={newFactor.name === "" || newFactor.intro === ""}
                on:click={(e) => {
                  e.preventDefault();
                  if (aspect.localizedFactors == null) {
                    aspect.localizedFactors = [];
                  }
                  let addedFactor = {
                    id: aspect.localizedFactors.length,
                    name: newFactor.name,
                    intro: newFactor.intro,
                  };
                  aspect.localizedFactors = [
                    ...aspect.localizedFactors,
                    addedFactor,
                  ];
                  newFactor = {
                    name: "",
                    intro: "",
                  };
                }}>+</button
              >
            </card>
          </card>
        </div>
      </div>
    </div>

    <div>
      <div>
        <h5 class="mt-3">Tracking</h5>
        <card body>
          <label for="title">Tracking Frage</label>
          <input
            id="title"
            placeholder="Frage"
            bind:value={aspect.localizedTrackingData.question}
          />

          <label for="title">Fußnoten</label>
          <input
            id="footnotes"
            placeholder="Fußnoten Text"
            type="textarea"
            bind:value={aspect.localizedTrackingData.footnote}
            on:change={(e) =>
              (aspect.localizedTrackingData.footnote = e.target.value)}
          />

          {#if aspect.localizedTrackingData.options}
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Stufe</th>
                    <th>Option</th>
                    <th>wachstumsfaktor</th>
                    <th>Eingespartes CO<sub>2</sub></th>
                    <th>Reward XP</th>
                    <th>Reward Coins</th>
                    <th>Reward Water</th>
                    <th>-</th>
                  </tr>
                </thead>
                <tbody>
                  {#each aspect.localizedTrackingData.options as option}
                    <tr>
                      <th>{option.level}</th>
                      <td>
                        <input
                          id="option"
                          placeholder="Option"
                          bind:value={option.option}
                        />
                      </td>
                      <td
                        ><input
                          id="waterFactor"
                          placeholder="-1 für N/A"
                          number
                          bind:value={option.waterFactor}
                        />
                      </td>
                      <td
                        ><input
                          id="co2value"
                          placeholder="-1 für N/A"
                          number
                          bind:value={option.co2value}
                        />
                      </td>
                      <td>
                        <input
                          id="option reward xp"
                          placeholder="reward xp"
                          
                          bind:value={option.reward.xp}
                        />
                      </td>
                      <td>
                        <input
                          id="option reward coins"
                          placeholder="reward coins"
                          
                          bind:value={option.reward.coins}
                        />
                      </td>
                      <td>
                        <input
                          id="option reward water"
                          placeholder="reward water"
                          
                          bind:value={option.reward.water}
                        />
                      </td>
                      <td
                        ><button
                          on:click={(e) => {
                            e.preventDefault();
                            aspect.localizedTrackingData.options =
                              aspect.localizedTrackingData.options.filter(
                                (o) => o.level !== option.level,
                              );
                            aspect.localizedTrackingData.options =
                              aspect.localizedTrackingData.options.map(
                                (o, i) => {
                                  o.level = i;
                                  return o;
                                },
                              );
                          }}>-</button
                        ></td
                      >
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
            <card body>
              <h5 class="mt-3">Neue Option hinzufügen</h5>

              <label for="option">Option</label>
              <input
                id="option"
                placeholder="Option"
                bind:value={currentOption.option}
              />
              <label for="waterFactor">waterFactor</label>
              <input
                id="waterFactor"
                placeholder="-1 für N/A"
                
                bind:value={currentOption.waterFactor}
              />
              <label for="co2value">co2value</label>
              <input
                id="co2value"
                placeholder="-1 für N/A"
                
                bind:value={currentOption.co2value}
              />
              <Rewardform reward={currentOption.reward} />
              <button
                on:click={(e) => {
                  e.preventDefault();
                  currentOption.level =
                    aspect.localizedTrackingData.options.length;
                  aspect.localizedTrackingData.options = [
                    ...aspect.localizedTrackingData.options,
                    currentOption,
                  ];
                  currentOption = {
                    option: "",
                    reward: new Reward(),
                    level: 0,
                    co2value: 0.0,
                    waterFactor: 0.0,
                  };
                }}
              >
                Option hinzufügen
              </button>
            </card>
          {:else}
            <select
              id="language"
              name="language"
              type="select"
              on:change={(e) => {
                console.log(e);
                e.preventDefault();
                aspect.localizedTrackingData = {
                  question: "",
                  options: [],
                };
              }}
             >
              <option value={null} default> -- Tracking Type -- </option>

              <option value={"steps"}>Steps</option>
              <option value={"Continuum"} disabled>Continuum</option>
            </select>
          {/if}
        </card>
      </div>
    </div>

    <!-- <div>
            <h5 class="mt-3">Quiz Elements</h5>
            <Container>
                <ListGroup>
                    <ListGroupItem action>Active</ListGroupItem>
                    <ListGroupItem action>Bravo</ListGroupItem>
                    <ListGroupItem action>Charlie</ListGroupItem>
                    <ListGroupItem action>Delta</ListGroupItem>
                </ListGroup>
            </Container>
        </div> -->
    <div>
      <label for={"published"} style="padding: 5px;">
        <input
          class="checkbox"
          type="checkbox"
          name={"published"}
          bind:checked={aspect.published}
        />
        Veröffentlichen
      </label>
      <ul>
        <button
          type="submit"
          form="form"
          on:click={(e) => {
            e.preventDefault();
            waiting = true;
            postAspect(aspect).then((res) => {
              handleAdd();
              // notifier.success("Änderungen gespeichert!", 2000)
              waiting = false;
            }); //.catch(err => notifier.error(err, 2000))
          }}
          >{#if waiting}
            <spinner info type="grow" />
          {:else}
            Speichern
          {/if}
        </button>
      </ul>
    </div>
  </form>
{:else}
  <card body>
    <h1>neuen Aspekt erstellen?</h1>
  </card>
{/if}

{#if !isProd}
  <div>
    <span>Debug</span>
    <pre>{JSON.stringify(aspect, null, 2)}</pre>
  </div>
{/if}
