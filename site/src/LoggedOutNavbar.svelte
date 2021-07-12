<script lang="ts">
        import {
        Collapse,
        Navbar,
        NavbarToggler,
        NavbarBrand,
        Nav,
        NavItem,
        NavLink
    } from "sveltestrap";


    let isOpen = false;

    function handleUpdate(event) {
        isOpen = event.detail.isOpen;
    }

</script>

<Navbar color="light" light expand="lg">
    <NavbarBrand href="/">
        <img
            src="/img/logo.png"
            height="30"
            class="d-inline-block align-top"
            alt="CyLogo"
        />
    </NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
        <Nav class="ml-auto" navbar pills>
            <NavItem>
                <NavLink href="/admin/">Admin-Bereich</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="https://github.com/climactivity"
                    >GitHub</NavLink
                >
            </NavItem>
        </Nav>
    </Collapse>
</Navbar>
