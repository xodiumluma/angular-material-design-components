import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, OnDestroy, APP_ID, inject } from "@angular/core";
import { Platform } from "@angular/cdk/platform";
import {
  addAriaReferencedId,
  getAriaReferenceIds,
  removeAriaReferencedId,
} from "./aria-reference";

/**
 * Contract used to register message elements and track how many registrations have the same message plus the reference to the message element used for `aria-describedby`
 */
export interface RegisteredMessage {
  messageElement: Element; // Element containing message
  referenceCount: number; // how many elements that reference this message through `aria-describedby`
}

/**
 * Body container's ID - all messages are appended here
 * @deprecated Remove, obsolete
 * @breaking-change 14.0.0
 */
export const MESSAGES_CONTAINER_ID = "cdk-describedby-message-container";

/**
 * ID prefix for each created message element
 * @deprecated change this to private variable
 * @breaking-change 14.0.0
 */
export const CDK_DESCRIBEDBY_ID_PREFIX = "cdk-describedby-message";
