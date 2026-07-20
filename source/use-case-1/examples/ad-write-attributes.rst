.. dropdown:: Create User With Persisted Claims
    :class-container: howtodrop

        .. code-block:: xml

            <TechnicalProfile Id="Custom-UserWriteUsingLogonEmail">
            <Metadata>
                <Item Key="Operation">Write</Item>
                <!-- Allows creating account with same email again -->
                <Item Key="RaiseErrorIfClaimsPrincipalAlreadyExists">false</Item>
                <Item Key="api-version">1.6</Item>
            </Metadata>
            <IncludeInSso>false</IncludeInSso>
            <InputClaims>
                <InputClaim ClaimTypeReferenceId="email" PartnerClaimType="signInNames.emailAddress" Required="true" />
            </InputClaims>
            <PersistedClaims>
                <!-- Required claims -->
                <PersistedClaim ClaimTypeReferenceId="email" PartnerClaimType="signInNames.emailAddress" />
                <PersistedClaim ClaimTypeReferenceId="hashedDocumentNumberAndIssuingAuthority" PartnerClaimType="signInNames.hashedDocNumIssAuth" />
                <!-- require a password, should be generated randomly -->
                <PersistedClaim ClaimTypeReferenceId="newPassword" PartnerClaimType="password" DefaultValue="fnpDD!casc2242" />
                <PersistedClaim ClaimTypeReferenceId="given_name" PartnerClaimType="displayName" DefaultValue="unknown" />
                <PersistedClaim ClaimTypeReferenceId="passwordPolicies" DefaultValue="DisablePasswordExpiration" />
                <PersistedClaim ClaimTypeReferenceId="extension_socialSecurityNumber" DefaultValue="" />
                <PersistedClaim ClaimTypeReferenceId="resident_address" PartnerClaimType="streetAddress" />
                <PersistedClaim ClaimTypeReferenceId="resident_postal_code" PartnerClaimType="postalCode" />
                <PersistedClaim ClaimTypeReferenceId="given_name" PartnerClaimType="givenName" />
                <PersistedClaim ClaimTypeReferenceId="resident_city" PartnerClaimType="city" />
                <PersistedClaim ClaimTypeReferenceId="resident_state" PartnerClaimType="state" />
                <PersistedClaim ClaimTypeReferenceId="family_name" PartnerClaimType="surname" />
                <PersistedClaim ClaimTypeReferenceId="phoneNumber" PartnerClaimType="telephoneNumber" />
                <PersistedClaim ClaimTypeReferenceId="extension_first_name_preferred" DefaultValue="" />
                <PersistedClaim ClaimTypeReferenceId="extension_middle_name_preferred" DefaultValue="" />
                <PersistedClaim ClaimTypeReferenceId="extension_last_name_preferred" DefaultValue="" />
                <PersistedClaim ClaimTypeReferenceId="extension_address_line_1_preferred" DefaultValue="" />
                <PersistedClaim ClaimTypeReferenceId="extension_address_line_2_preferred" DefaultValue="" />
                <PersistedClaim ClaimTypeReferenceId="extension_city_preferred" DefaultValue="" />
                <PersistedClaim ClaimTypeReferenceId="extension_state_preferred" DefaultValue="" />
                <PersistedClaim ClaimTypeReferenceId="extension_zip_code_preferred" DefaultValue="" />
            </PersistedClaims>
            <OutputClaims>
                <OutputClaim ClaimTypeReferenceId="objectId" />
                <OutputClaim ClaimTypeReferenceId="hashedDocumentNumberAndIssuingAuthority" PartnerClaimType="signInNames.hashedDocNumIssAuth" />
                <OutputClaim ClaimTypeReferenceId="newUser" PartnerClaimType="newClaimsPrincipalCreated" />
                <OutputClaim ClaimTypeReferenceId="authenticationSource" DefaultValue="localAccountAuthentication" />
                <OutputClaim ClaimTypeReferenceId="userPrincipalName" />
                <OutputClaim ClaimTypeReferenceId="signInNames.emailAddress" />
            </OutputClaims>
            <IncludeTechnicalProfile ReferenceId="AAD-Common" />
            <UseTechnicalProfileForSessionManagement ReferenceId="SM-AAD" />
            </TechnicalProfile>